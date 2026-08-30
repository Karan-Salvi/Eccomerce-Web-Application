import test from 'node:test';
import assert from 'node:assert/strict';

import orderRouter from '#modules/orders/order.routes.js';

function middlewareNamesFor(method, path) {
  const layer = orderRouter.stack.find(
    (l) => l.route && l.route.path === path && l.route.methods[method]
  );
  assert.ok(layer, `no route registered for ${method.toUpperCase()} ${path}`);
  // route.stack mixes layers from every HTTP method registered on this path —
  // filter by method so a passing PUT test can't hide a missing DELETE guard.
  return layer.route.stack.filter((s) => s.method === method).map((s) => s.name);
}

test('GET /order/:id requires auth', () => {
  assert.ok(middlewareNamesFor('get', '/order/:id').includes('checkAuthenticatedMiddleware'));
});

test('GET /orders/me requires auth', () => {
  assert.ok(middlewareNamesFor('get', '/orders/me').includes('checkAuthenticatedMiddleware'));
});

test('GET /orders requires auth + admin role', () => {
  const names = middlewareNamesFor('get', '/orders');
  assert.ok(names.includes('checkAuthenticatedMiddleware'));
  assert.ok(names.includes('authorizeRolesMiddleware'));
});

test('PUT /order/update/:id requires auth + admin role', () => {
  const names = middlewareNamesFor('put', '/order/update/:id');
  assert.ok(names.includes('checkAuthenticatedMiddleware'));
  assert.ok(names.includes('authorizeRolesMiddleware'));
});

test('DELETE /order/delete/:id requires auth + admin role', () => {
  const names = middlewareNamesFor('delete', '/order/delete/:id');
  assert.ok(names.includes('checkAuthenticatedMiddleware'));
  assert.ok(names.includes('authorizeRolesMiddleware'));
});
