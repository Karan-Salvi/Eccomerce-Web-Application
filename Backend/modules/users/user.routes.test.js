import test from 'node:test';
import assert from 'node:assert/strict';

import userRouter from '#modules/users/user.routes.js';

function middlewareNamesFor(method, path) {
  const layer = userRouter.stack.find(
    (l) => l.route && l.route.path === path && l.route.methods[method]
  );
  assert.ok(layer, `no route registered for ${method.toUpperCase()} ${path}`);
  return layer.route.stack.filter((s) => s.method === method).map((s) => s.name);
}

test('GET /users requires auth + admin role', () => {
  const names = middlewareNamesFor('get', '/users');
  assert.ok(names.includes('checkAuthenticatedMiddleware'));
  assert.ok(names.includes('authorizeRolesMiddleware'));
});

test('GET /users/:id requires auth + admin role', () => {
  const names = middlewareNamesFor('get', '/users/:id');
  assert.ok(names.includes('checkAuthenticatedMiddleware'));
  assert.ok(names.includes('authorizeRolesMiddleware'));
});
