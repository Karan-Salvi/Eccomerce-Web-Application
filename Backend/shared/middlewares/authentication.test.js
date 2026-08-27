import test from 'node:test';
import assert from 'node:assert/strict';

import { checkAuthenticated, authorizeRoles } from '#shared/middlewares/authentication.js';

test('checkAuthenticated() returns a named middleware function', () => {
  const middleware = checkAuthenticated();
  assert.equal(middleware.name, 'checkAuthenticatedMiddleware');
});

test('authorizeRoles() returns a named middleware function', () => {
  const middleware = authorizeRoles('admin');
  assert.equal(middleware.name, 'authorizeRolesMiddleware');
});
