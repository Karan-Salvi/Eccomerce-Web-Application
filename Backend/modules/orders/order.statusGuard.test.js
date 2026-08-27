import test from 'node:test';
import assert from 'node:assert/strict';

import { isAlreadyDelivered } from '#modules/orders/order.statusGuard.js';

test('isAlreadyDelivered returns true for the schema-cased "delivered" status', () => {
  assert.equal(isAlreadyDelivered({ orderStatus: 'delivered' }), true);
});

test('isAlreadyDelivered returns false for other statuses', () => {
  assert.equal(isAlreadyDelivered({ orderStatus: 'processing' }), false);
  assert.equal(isAlreadyDelivered({ orderStatus: 'shipped' }), false);
});

test('isAlreadyDelivered returns false for the old, wrong "Delivered" casing', () => {
  assert.equal(isAlreadyDelivered({ orderStatus: 'Delivered' }), false);
});
