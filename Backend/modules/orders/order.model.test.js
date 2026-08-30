import test from 'node:test';
import assert from 'node:assert/strict';

import Order from '#modules/orders/order.model.js';

function hasIndexOn(fieldName) {
  return Order.schema
    .indexes()
    .some(([spec]) => Object.prototype.hasOwnProperty.call(spec, fieldName));
}

test('Order schema has an index on user (used by myOrders lookup)', () => {
  assert.ok(hasIndexOn('user'), 'expected an index containing the "user" field');
});

test('Order schema has an index on orderStatus (used by admin status filtering)', () => {
  assert.ok(hasIndexOn('orderStatus'), 'expected an index containing the "orderStatus" field');
});
