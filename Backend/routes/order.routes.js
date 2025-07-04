const express = require("express");
const {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller.js");
const { checkAuthenticated } = require("../middlewares/authentication.js");

const router = express.Router();

router.route("/order/new").post(checkAuthenticated(), createNewOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").get(myOrders);

router.route("/orders").get(getAllOrders);

router.route("/order/update/:id").put(updateOrderStatus);

router.route("/order/delete/:id").delete(deleteOrder);

module.exports = router;
