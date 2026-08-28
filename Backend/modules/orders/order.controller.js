import Stripe from 'stripe';
import dotenv from 'dotenv';

import Order from '#modules/orders/order.model.js';
import Product from '#modules/products/product.model.js';
import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';
import logger from '#infra/logger/logger.js';
import redisClient from '#config/redis.js';
import { calculateOrderTotal } from '#modules/orders/order.pricing.js';
import { verifyStripeWebhookEvent } from '#modules/orders/order.webhook.js';
import { isAlreadyDelivered } from '#modules/orders/order.statusGuard.js';
import { reserveStock, releaseStock } from '#modules/products/product.stock.js';
import { withIdempotentResult, markEventProcessed } from '#shared/utils/idempotency.js';

// dotenv configuration
dotenv.config({
  path: './.env',
});

const FRONTEND_URI = process.env.FRONTEND_URI;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const IDEMPOTENCY_TTL_SECONDS = 600; // 10 minutes — long enough to cover a retried double-click
const WEBHOOK_EVENT_TTL_SECONDS = 86400; // Stripe retries a failing webhook for up to 3 days; this is a practical floor, not a hard guarantee

export async function buildCodOrder(
  orderData,
  { productModel = Product, orderModel = Order, stockRedisClient } = {}
) {
  const { shippingInfo, orderItems, userId, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    orderData;

  await reserveStock(orderItems, { productModel, redisClient: stockRedisClient });

  const paymentInfo = { id: 'COD', status: 'pending' };

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    user: userId,
    paymentMethod: 'cod',
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  });

  logger.info(`Order created successfully with ID (COD): ${order._id}`);

  return {
    status: 201,
    body: {
      success: true,
      message: 'Order placed successfully',
      data: order,
    },
  };
}

export async function buildStripeOrder(
  orderData,
  { productModel = Product, orderModel = Order, stockRedisClient } = {}
) {
  const { shippingInfo, orderItems, userId, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    orderData;

  const reserved = await reserveStock(orderItems, { productModel, redisClient: stockRedisClient });

  try {
    const paymentInfo = { id: 'stripe', status: 'pending' };

    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      user: userId,
      paymentMethod: 'stripe',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    });

    const populatedOrder = await orderModel.findById(order._id).populate('orderItems.product');

    const missingProduct = populatedOrder.orderItems.find((item) => !item.product);
    if (missingProduct) {
      const error = new Error('One or more products in this order no longer exist');
      error.statusCode = 409;
      error.expose = true;
      throw error;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: populatedOrder.orderItems.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.product.name,
            images: item.product.images?.[0]?.url ? [item.product.images[0].url] : [],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${FRONTEND_URI}/order-success/${order._id}`,
      cancel_url: `${FRONTEND_URI}/order-cancel/${order._id}`,
      metadata: {
        orderId: order._id.toString(),
        userId: order.user.toString(),
      },
      shipping_address_collection: { allowed_countries: ['IN'] },
    });

    if (!session.url) {
      const error = new Error('Error while creating Stripe session');
      error.statusCode = 400;
      error.expose = true;
      throw error;
    }

    order.paymentInfo.id = session.id;
    order.paymentInfo.status = 'pending';
    await order.save();

    logger.info(`Order created successfully with ID (Stripe): ${order._id}`);

    return {
      status: 201,
      body: {
        success: true,
        message: 'Order placed successfully',
        data: order,
        sessionUrl: session.url,
      },
    };
  } catch (error) {
    // Stock was already decremented above; a failure anywhere past that point
    // (Stripe down, order save failed, product deleted mid-flight) must give
    // it back or the product stays permanently understocked.
    try {
      await releaseStock(reserved, { productModel });
    } catch (releaseError) {
      logger.error(
        `Failed to release reserved stock after Stripe order failure: ${releaseError.message}`
      );
    }
    throw error;
  }
}

// create new order
export const createNewOrder = catchAsyncErrors(async (req, res) => {
  let { shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, paymentMethod } = req.body;
  const userId = req.user._id;

  if (!shippingInfo || !orderItems || !itemsPrice || !taxPrice || !shippingPrice || !userId) {
    logger.error('Missing required fields for order creation');
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  if (paymentMethod !== 'cod' && paymentMethod !== 'stripe') {
    logger.error(`Invalid payment method for order creation: ${paymentMethod}`);
    return res.status(400).json({
      success: false,
      message: 'Invalid payment method',
    });
  }

  itemsPrice = Number(itemsPrice);
  taxPrice = Number(taxPrice);
  shippingPrice = Number(shippingPrice);

  const { totalPrice } = calculateOrderTotal({ itemsPrice, taxPrice, shippingPrice });

  const orderData = {
    shippingInfo,
    orderItems,
    userId,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  };

  const computeOrder =
    paymentMethod === 'cod' ? () => buildCodOrder(orderData) : () => buildStripeOrder(orderData);

  try {
    const idempotencyKey = req.headers['idempotency-key'];
    let outcome;

    if (idempotencyKey) {
      // computeStarted tells a Redis-layer failure apart from a failure that
      // came out of computeOrder itself — the latter must never be retried.
      let computeStarted = false;
      try {
        const { result } = await withIdempotentResult(
          redisClient,
          `order:${userId}:${idempotencyKey}`,
          IDEMPOTENCY_TTL_SECONDS,
          () => {
            computeStarted = true;
            return computeOrder();
          }
        );
        outcome = result;
      } catch (error) {
        if (computeStarted || error.expose) throw error;
        logger.warn(
          `Redis unavailable for idempotency (${error.message}) — proceeding without idempotency protection`
        );
        outcome = await computeOrder();
      }
    } else {
      outcome = await computeOrder();
    }

    return res.status(outcome.status).json(outcome.body);
  } catch (error) {
    if (error.expose && error.statusCode) {
      logger.error(`Order creation failed (${error.statusCode}): ${error.message}`);
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    throw error;
  }
});

export const stripeWebhook = catchAsyncErrors(async (req, res) => {
  let event;

  try {
    const signature = req.headers['stripe-signature'];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    event = verifyStripeWebhookEvent(req.rawBody, signature, secret);
  } catch (error) {
    logger.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    // Redis being down must degrade dedup protection, not block payment
    // confirmation — treat a failed claim as "first delivery" and carry on.
    let isFirstDelivery = true;
    try {
      isFirstDelivery = await markEventProcessed(redisClient, event.id, WEBHOOK_EVENT_TTL_SECONDS);
    } catch (error) {
      logger.warn(
        `Redis unavailable for webhook dedup (${error.message}) — processing event ${event.id} without duplicate protection`
      );
    }

    if (!isFirstDelivery) {
      logger.info(`Duplicate webhook delivery for event ${event.id}, skipping`);
      return res.status(200).json({ message: 'Already processed' });
    }

    logger.info('Checkout session completed event received');

    try {
      const session = event.data.object;

      if (!session.metadata || !session.metadata.orderId) {
        logger.error('Session metadata or orderId is missing');
        return res.status(400).json({ message: 'Invalid session metadata' });
      }

      let purchasedOrder = await Order.findOne({
        'paymentInfo.id': session.id,
      });

      if (!purchasedOrder) {
        logger.error('Order not found');
        return res.status(404).json({ message: 'Order not found' });
      }

      purchasedOrder.paymentInfo.status = 'completed';
      purchasedOrder.paidAt = Date.now();

      await purchasedOrder.save();

      logger.info('Order payment completed successfully');

      return res.status(200).json({ message: 'Order payment completed successfully' });
    } catch (error) {
      logger.error('Error handling event:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  res.status(200).send();
});

// get single order details -- owner or ADMIN
export const getSingleOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  const isOwner = order.user._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to view this order',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

// get my orders
export const myOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return res.status(404).json({
      success: false,
      message: 'Orders not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

// get all order details -- ADMIN
export const getAllOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    return res.status(404).json({
      success: false,
      message: 'Orders not found',
    });
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
    totalAmount,
  });
});

// update order status - ADMIN
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });
  }

  if (isAlreadyDelivered(order)) {
    return res.status(400).json({
      message: 'You have all ready delivered the product',
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === 'delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: order,
  });
});

export const deleteOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Orders not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Order deleted successfully',
    data: order,
  });
});
