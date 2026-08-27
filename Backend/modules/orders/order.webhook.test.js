import test from 'node:test';
import assert from 'node:assert/strict';
import Stripe from 'stripe';

import { verifyStripeWebhookEvent } from '#modules/orders/order.webhook.js';

const secret = 'whsec_test_secret';
const stripeForSigning = new Stripe('sk_test_placeholder');

test('verifyStripeWebhookEvent accepts a validly-signed payload', () => {
  const payload = JSON.stringify({
    id: 'evt_test',
    type: 'checkout.session.completed',
    data: { object: { id: 'cs_test', metadata: { orderId: 'order123' } } },
  });
  const header = stripeForSigning.webhooks.generateTestHeaderString({ payload, secret });

  const event = verifyStripeWebhookEvent(payload, header, secret);
  assert.equal(event.type, 'checkout.session.completed');
});

test('verifyStripeWebhookEvent rejects a tampered payload', () => {
  const originalPayload = JSON.stringify({ id: 'evt_test', type: 'checkout.session.completed' });
  const header = stripeForSigning.webhooks.generateTestHeaderString({
    payload: originalPayload,
    secret,
  });

  const tamperedPayload = JSON.stringify({ id: 'evt_test', type: 'payment_intent.succeeded' });

  assert.throws(() => verifyStripeWebhookEvent(tamperedPayload, header, secret));
});

test('verifyStripeWebhookEvent rejects a wrong secret', () => {
  const payload = JSON.stringify({ id: 'evt_test', type: 'checkout.session.completed' });
  const header = stripeForSigning.webhooks.generateTestHeaderString({ payload, secret });

  assert.throws(() => verifyStripeWebhookEvent(payload, header, 'whsec_wrong_secret'));
});
