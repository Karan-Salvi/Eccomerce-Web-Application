import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      enum: ['general', 'order', 'returns', 'feedback', 'other'],
    },
    message: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
