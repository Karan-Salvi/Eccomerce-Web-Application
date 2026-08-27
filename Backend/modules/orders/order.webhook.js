import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

export function verifyStripeWebhookEvent(rawBody, signatureHeader, endpointSecret) {
  return stripe.webhooks.constructEvent(rawBody, signatureHeader, endpointSecret);
}
