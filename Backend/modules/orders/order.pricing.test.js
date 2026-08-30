import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateOrderTotal } from '#modules/orders/order.pricing.js';

test('calculateOrderTotal applies tax as a percentage of itemsPrice and adds shipping', () => {
  const result = calculateOrderTotal({ itemsPrice: 1000, taxPrice: 18, shippingPrice: 50 });
  assert.equal(result.taxAmount, 180);
  assert.equal(result.totalPrice, 1230);
});

test('calculateOrderTotal handles zero tax and zero shipping', () => {
  const result = calculateOrderTotal({ itemsPrice: 500, taxPrice: 0, shippingPrice: 0 });
  assert.equal(result.taxAmount, 0);
  assert.equal(result.totalPrice, 500);
});

test('calculateOrderTotal coerces numeric strings, matching req.body input shape', () => {
  const result = calculateOrderTotal({ itemsPrice: '1000', taxPrice: '18', shippingPrice: '50' });
  assert.equal(result.totalPrice, 1230);
});
