const express = require("express");
const {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  paymentVerified,
  getKey,
} = require("../controllers/order.controller.js");
const { checkAuthenticated } = require("../middlewares/authentication.js");

const router = express.Router();

router.route("/order/new").post(checkAuthenticated(), createNewOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").get(checkAuthenticated(), myOrders);

router.route("/orders").get(checkAuthenticated(), getAllOrders);

router.route("/order/update/:id").put(checkAuthenticated(), updateOrderStatus);

router.route("/order/delete/:id").delete(checkAuthenticated(), deleteOrder);

router.route("/order/new/verified").post(paymentVerified);

router.route("/order/new/getkey").get(getKey);

module.exports = router;
