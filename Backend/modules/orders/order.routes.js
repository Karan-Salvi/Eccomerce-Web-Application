import express from "express";
import {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  stripeWebhook,
} from "#modules/orders/order.controller.js";
import { checkAuthenticated } from "#shared/middlewares/authentication.js";

const router = express.Router();

router.route("/order/new").post(checkAuthenticated(), createNewOrder);

router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").get(myOrders);

router.route("/orders").get(getAllOrders);

router.route("/order/update/:id").put(updateOrderStatus);

router.route("/order/delete/:id").delete(deleteOrder);

export default router;
