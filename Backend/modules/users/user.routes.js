import express from 'express';

import { checkAuthenticated, authorizeRoles } from '#shared/middlewares/authentication.js';
import { ROLES } from '#shared/constants/roles.constants.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updatePersonalDetails,
  DeleteUser,
  updateUserRole,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} from '#modules/users/user.controller.js';

const router = express.Router();

router.route('/register').post(registerUser); // done

router.route('/login').post(loginUser); // done

router.route('/password/forgot').post(forgetPassword); // done

router.route('/password/reset/:token').put(resetPassword); // done

router.route('/logout').get(checkAuthenticated(), logoutUser); // done

router
  .route('/update/:id')
  .put(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), updateUserDetails); // done

router.route('/me').get(checkAuthenticated(), getUserDetails); // done

router.route('/password/update').put(checkAuthenticated(), updatePassword); // done

router.route('/me/update').put(checkAuthenticated(), updatePersonalDetails);

router
  .route('/user/delete/:id')
  .delete(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), DeleteUser); // done

router
  .route('/user/updateRole/:id')
  .put(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), updateUserRole); // done

router
  .route('/user/wishlist')
  .post(checkAuthenticated(), addToWishlist)
  .delete(checkAuthenticated(), removeFromWishlist);

router
  .route('/user/cart')
  .post(checkAuthenticated(), addToCart)
  .delete(checkAuthenticated(), removeFromCart);

export default router;
