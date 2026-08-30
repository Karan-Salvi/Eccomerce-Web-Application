import express from 'express';

import {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  stripeWebhook,
} from '#modules/orders/order.controller.js';
import { checkAuthenticated, authorizeRoles } from '#shared/middlewares/authentication.js';
import { ROLES } from '#shared/constants/roles.constants.js';

const router = express.Router();

router.route('/order/new').post(checkAuthenticated(), createNewOrder);

router.route('/webhook').post(stripeWebhook);

router.route('/order/:id').get(checkAuthenticated(), getSingleOrder);

router.route('/orders/me').get(checkAuthenticated(), myOrders);

router.route('/orders').get(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), getAllOrders);

router
  .route('/order/update/:id')
  .put(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), updateOrderStatus);

router
  .route('/order/delete/:id')
  .delete(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), deleteOrder);

export default router;
