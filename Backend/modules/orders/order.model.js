import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
      {
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'stripe'],
      required: true,
      default: 'cod',
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
        required: true,
      },
    },

    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
      required: true,
      default: 'processing',
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
