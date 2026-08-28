import express from 'express';

import { checkAuthenticated } from '#shared/middlewares/authentication.js';
import {
  getSimilarProductsRoute,
  getRecommendationsForMeRoute,
} from '#modules/recommendations/recommendation.controller.js';

const router = express.Router();

router.route('/recommendations/similar/:productId').get(getSimilarProductsRoute);

router.route('/recommendations/for-me').get(checkAuthenticated(), getRecommendationsForMeRoute);

export default router;
