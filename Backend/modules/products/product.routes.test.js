import test from 'node:test';
import assert from 'node:assert/strict';

import productRouter from '#modules/products/product.routes.js';

function middlewareNamesFor(method, path) {
  const layer = productRouter.stack.find(
    (l) => l.route && l.route.path === path && l.route.methods[method]
  );
  assert.ok(layer, `no route registered for ${method.toUpperCase()} ${path}`);
  // route.stack mixes layers from every HTTP method registered on this path
  // (.put().delete().get() all push into the same array) — filter by method
  // or a PUT-only test would false-pass off DELETE's middleware and vice versa.
  return layer.route.stack.filter((s) => s.method === method).map((s) => s.name);
}

test('POST /product/new requires auth and vendor/admin role', () => {
  const names = middlewareNamesFor('post', '/product/new');
  assert.ok(names.includes('checkAuthenticatedMiddleware'), 'missing checkAuthenticated');
  assert.ok(names.includes('authorizeRolesMiddleware'), 'missing authorizeRoles');
});

test('PUT /product/:id requires auth and vendor/admin role', () => {
  const names = middlewareNamesFor('put', '/product/:id');
  assert.ok(names.includes('checkAuthenticatedMiddleware'), 'missing checkAuthenticated');
  assert.ok(names.includes('authorizeRolesMiddleware'), 'missing authorizeRoles');
});

test('DELETE /product/:id requires auth and vendor/admin role', () => {
  const names = middlewareNamesFor('delete', '/product/:id');
  assert.ok(names.includes('checkAuthenticatedMiddleware'), 'missing checkAuthenticated');
  assert.ok(names.includes('authorizeRolesMiddleware'), 'missing authorizeRoles');
});
