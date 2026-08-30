import ContactMessage from '#modules/contact/contact.model.js';
import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';
import logger from '#infra/logger/logger.js';

export const createContactMessage = catchAsyncErrors(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contactMessage = await ContactMessage.create({ name, email, subject, message });

  logger.info(`Contact message received: ${contactMessage._id} (${subject})`);

  return res.status(201).json({
    success: true,
    message: "Thanks for reaching out. We'll get back to you soon.",
    data: contactMessage,
  });
});
