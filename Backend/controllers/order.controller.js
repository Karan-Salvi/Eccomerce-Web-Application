const Order = require("../models/order.model.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const Product = require("../models/product.model.js");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// create new order
const createNewOrder = catchAsyncErrors(async (req, res) => {
  const { amount } = req.body;

  const amoutValue = Number(amount);

  const instance = await new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amoutValue * 100, // amount in the smallest currency unit
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  //console.log(order);
  // const order = await Order.create({
  //   shippingInfo,
  //   orderItems,
  //   paymentInfo,
  //   itemsPrice,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice,
  //   paidAt: Date.now(),
  //   user: req.user._id,
  // });

  return res.status(200).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

const paymentVerified = catchAsyncErrors(async (req, res) => {

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.redirect(
      `http://localhost:5173/paymentdone?reference=${razorpay_payment_id}`
    );

    return res.status(200).json({
      success: true,
      message: "Signature is authenticated successfully.",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Signature is not valid ",
    });
  }
});

const getKey = catchAsyncErrors(async (req, res) => {

  return res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
    user: req.user,
    message: "Key fetched successfully.",
  });
});

// get single order details -- ADMIN
const getSingleOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
});

// get my orders
const myOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "Orders not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});

// get all order details -- ADMIN
const getAllOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "Orders not found",
    });
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
    totalAmount,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
}

// update order status - ADMIN
const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      message: "You have allready delivered the product",
    });
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

const deleteOrder = catchAsyncErrors(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Orders not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
});

module.exports = {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  paymentVerified,
  getKey,
};
