import express from 'express';

import validate from '#shared/middlewares/validate.js';
import { createContactMessageSchema } from '#modules/contact/contact.validation.js';
import { createContactMessage } from '#modules/contact/contact.controller.js';

const router = express.Router();

router.route('/contact').post(validate(createContactMessageSchema), createContactMessage);

export default router;
