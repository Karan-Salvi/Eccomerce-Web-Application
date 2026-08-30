import express from 'express';

import { checkAuthenticated, authorizeRoles } from '#shared/middlewares/authentication.js';
import { ROLES } from '#shared/constants/roles.constants.js';
import {
  getMyProductsRoute,
  getMyOrdersRoute,
  getMyAnalyticsRoute,
} from '#modules/vendor/vendor.controller.js';

const router = express.Router();

router
  .route('/vendor/products')
  .get(checkAuthenticated(), authorizeRoles(ROLES.VENDOR, ROLES.ADMIN), getMyProductsRoute);

router
  .route('/vendor/orders')
  .get(checkAuthenticated(), authorizeRoles(ROLES.VENDOR, ROLES.ADMIN), getMyOrdersRoute);

router
  .route('/vendor/analytics')
  .get(checkAuthenticated(), authorizeRoles(ROLES.VENDOR, ROLES.ADMIN), getMyAnalyticsRoute);

export default router;
