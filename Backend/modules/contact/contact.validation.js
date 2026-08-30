import { z } from 'zod';

export const createContactMessageSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().toLowerCase().email('Enter a valid email address'),
    subject: z.enum(['general', 'order', 'returns', 'feedback', 'other'], {
      message: 'Select a valid subject',
    }),
    message: z.string().trim().min(1, 'Message is required').max(2000),
  }),
});
