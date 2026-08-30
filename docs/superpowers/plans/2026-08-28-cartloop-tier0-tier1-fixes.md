# CartLoop Tier 0 + Tier 1 Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make checkout actually work, close the open write/delete auth holes, make the Stripe webhook verify real signatures, fix the dead order-status guard, close the stale-cache gap on filtered product listings, and add the missing Order indexes — the Tier 0 (critical) and Tier 1 (data integrity/caching) items from the CartLoop fix list.

**Architecture:** No new services or dependencies. Fixes are localized to `Backend/modules/orders`, `Backend/modules/products`, `Backend/shared/middlewares`, and `Backend/index.js`. Two small pure-logic modules (`order.pricing.js`, `order.webhook.js`) are extracted out of the controller so the critical money-math and signature-verification logic is unit-testable without a running server or database — the codebase currently has zero test infrastructure, so this plan also introduces the minimum needed (Node's built-in `node:test`, already available in the installed Node 22, no new dependency).

**Tech Stack:** Node.js 22 (ESM), Express 4, Mongoose 8, ioredis 5, Stripe SDK 18, `node:test` + `node:assert` (built-in, no install).

**Spec:** This plan implements Tier 0 ("Critical: security & broken functionality") and Tier 1 ("Data integrity & caching correctness") of the CartLoop fix list from the prior audit conversation — no separate spec file exists; the fix list itself is the spec, reproduced task-by-task below. **Tier 2 (recommendation engine, real-time vendor dashboard, multi-vendor architecture), Tier 3 (load testing/measurement), and Tier 4 (resume framing) are out of scope for this plan** — each is an independent subsystem requiring its own brainstorming/planning pass, and Tier 3 cannot start honestly until this plan's Task 1 (checkout fix) is merged.

## Global Constraints

- No new npm dependencies — use only what's already installed (`stripe`, `mongoose`, `ioredis`, `express`) plus Node's built-in `node:test`.
- Every task ends with a runnable check (`node --test <file>`) — no task is "done" without one passing.
- Follow the existing backend import-alias convention (`#modules/*`, `#shared/*`, `#infra/*`, `#config/*`, `#database/*`) defined in `Backend/package.json`'s `imports` field — new files must use these aliases, not relative `../../` paths.
- Match existing code style: named exports, `catchAsyncErrors` wrapper on every route handler, `logger` (Winston, from `#infra/logger/logger.js`) for server-side logging, not `console.log`.
- Role strings are exactly `'user'`, `'vendor'`, `'admin'` (lowercase) — matches `Frontend/src/constants/roles.constants.js` and `Backend/modules/users/user.model.js`'s `role` field default.

---

## File Structure

| File | Responsibility |
|---|---|
| `Backend/modules/orders/order.pricing.js` | **New.** Pure function computing `totalPrice` from `itemsPrice`/`taxPrice`/`shippingPrice`. Extracted so Task 1 has something unit-testable without spinning up Express/Mongo. |
| `Backend/modules/orders/order.pricing.test.js` | **New.** `node:test` coverage for the pricing function. |
| `Backend/modules/orders/order.webhook.js` | **New.** Wraps `stripe.webhooks.constructEvent` behind a named function so Task 5 can unit-test real signature verification (including rejecting a tampered payload) without a live server. |
| `Backend/modules/orders/order.webhook.test.js` | **New.** `node:test` coverage proving a validly-signed payload verifies and a tampered one throws. |
| `Backend/modules/orders/order.controller.js` | **Modify.** Task 1 fixes the crash and calls `order.pricing.js`; Task 5 replaces the fake webhook verification with `order.webhook.js`; Task 6 fixes the status-guard casing bug. |
| `Backend/modules/orders/order.model.js` | **Modify.** Task 9 adds indexes on `user` and `orderStatus`. |
| `Backend/modules/orders/order.model.test.js` | **New.** `node:test` asserting the expected indexes are declared on the schema (schema introspection, no DB connection needed). |
| `Backend/modules/orders/order.routes.js` | **Modify.** Task 4 adds `checkAuthenticated`/`authorizeRoles` to every route except `/order/new` (already protected). |
| `Backend/modules/orders/order.routes.test.js` | **New.** Router-stack introspection test proving each route carries the expected middleware. |
| `Backend/modules/products/product.routes.js` | **Modify.** Task 3 adds `checkAuthenticated`/`authorizeRoles` to the product create/update/delete routes. |
| `Backend/modules/products/product.routes.test.js` | **New.** Router-stack introspection test, same pattern as order routes. |
| `Backend/modules/products/product.controller.js` | **Modify.** Task 7 changes the paginated-listing cache key to include a version token and adds version-bump calls on write. |
| `Backend/modules/products/product.controller.test.js` | **New.** `node:test` for the cache-key-building helper (pure logic, extracted for testability). |
| `Backend/shared/utils/productCacheVersion.js` | **New.** Tiny helper: `getCacheVersion(redisClient)` / `bumpCacheVersion(redisClient)`, wrapping the Redis `INCR`-based versioning scheme used by Task 7. |
| `Backend/shared/constants/roles.constants.js` | **New.** Backend mirror of `Frontend/src/constants/roles.constants.js` (`USER`/`VENDER`/`ADMIN` → `'user'`/`'vendor'`/`'admin'`), so route files reference constants instead of retyping string literals. |
| `Backend/shared/middlewares/authentication.js` | **Modify.** Task 2 names the two returned middleware functions (`checkAuthenticatedMiddleware`, `authorizeRolesMiddleware`) so the router-stack tests in Tasks 3–4 can identify them reliably by `.name`. |
| `Backend/infra/redis/redisCache.js` | **Delete.** Task 8 — dead code, `redisClient` used without import, confirmed unused anywhere in the repo. |
| `Backend/index.js` | **Modify.** Task 5 dedupes the accidentally-doubled body-parser middleware block and adds `verify` capture of the raw body needed for real Stripe signature checking; Task 5 also removes the now-unnecessary per-route `express.raw()` from the webhook route. |

---

### Task 1: Fix the checkout crash (undeclared `taxPriceOfAmount`)

**Files:**
- Create: `Backend/modules/orders/order.pricing.js`
- Create: `Backend/modules/orders/order.pricing.test.js`
- Modify: `Backend/modules/orders/order.controller.js:29-36`

**Interfaces:**
- Produces: `calculateOrderTotal({ itemsPrice: number, taxPrice: number, shippingPrice: number }) => { taxAmount: number, totalPrice: number }` — consumed by `order.controller.js`'s `createNewOrder`.

- [ ] **Step 1: Write the failing test**

Create `Backend/modules/orders/order.pricing.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/orders/order.pricing.test.js`
Expected: FAIL — `Cannot find module '#modules/orders/order.pricing.js'`

- [ ] **Step 3: Write minimal implementation**

Create `Backend/modules/orders/order.pricing.js`:

```js
export function calculateOrderTotal({ itemsPrice, taxPrice, shippingPrice }) {
  const items = Number(itemsPrice);
  const tax = Number(taxPrice);
  const shipping = Number(shippingPrice);

  const taxAmount = items * (tax / 100);
  const totalPrice = items + taxAmount + shipping;

  return { taxAmount, totalPrice };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test modules/orders/order.pricing.test.js`
Expected: PASS (3/3)

- [ ] **Step 5: Wire it into the controller, replacing the crash**

In `Backend/modules/orders/order.controller.js`, add the import at the top (after the existing `logger` import):

```js
import { calculateOrderTotal } from '#modules/orders/order.pricing.js';
```

Replace lines 29-36:

```js
  let totalPrice = 0;
  taxPrice = Number(taxPrice);
  itemsPrice = Number(itemsPrice);
  shippingPrice = Number(shippingPrice);

  taxPriceOfAmount = itemsPrice * (taxPrice / 100); // Assuming 18% tax

  totalPrice += itemsPrice + taxPriceOfAmount + shippingPrice;
```

with:

```js
  itemsPrice = Number(itemsPrice);
  taxPrice = Number(taxPrice);
  shippingPrice = Number(shippingPrice);

  const { totalPrice } = calculateOrderTotal({ itemsPrice, taxPrice, shippingPrice });
```

- [ ] **Step 6: Manual smoke check**

Run: `cd Backend && node -e "import('./modules/orders/order.pricing.js').then(m => console.log(m.calculateOrderTotal({itemsPrice:1000,taxPrice:18,shippingPrice:50})))"`
Expected: `{ taxAmount: 180, totalPrice: 1230 }` printed, no `ReferenceError`.

- [ ] **Step 7: Commit**

```bash
git add Backend/modules/orders/order.pricing.js Backend/modules/orders/order.pricing.test.js Backend/modules/orders/order.controller.js
git commit -m "fix: extract order total calc, remove undeclared-variable crash in checkout"
```

---

### Task 2: Name the auth middleware functions (enables Task 3/4 tests)

**Files:**
- Modify: `Backend/shared/middlewares/authentication.js`

**Interfaces:**
- Produces: `checkAuthenticated()` now returns a function named `checkAuthenticatedMiddleware`; `authorizeRoles(...roles)` now returns a function named `authorizeRolesMiddleware`. Consumed by Task 3/4's router-stack tests via `layer.handle.name`.

- [ ] **Step 1: Write the failing test**

Create `Backend/shared/middlewares/authentication.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test shared/middlewares/authentication.test.js`
Expected: FAIL — both assertions fail, actual name is `''` (anonymous arrow functions).

- [ ] **Step 3: Name the returned functions**

In `Backend/shared/middlewares/authentication.js`, change:

```js
export function checkAuthenticated() {
  return async (req, res, next) => {
```

to:

```js
export function checkAuthenticated() {
  return async function checkAuthenticatedMiddleware(req, res, next) {
```

and change:

```js
export function authorizeRoles(...roles) {
  return async (req, res, next) => {
```

to:

```js
export function authorizeRoles(...roles) {
  return async function authorizeRolesMiddleware(req, res, next) {
```

(Both closing `};` stay as-is — only the function keyword/name changes, no behavior change.)

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test shared/middlewares/authentication.test.js`
Expected: PASS (2/2)

- [ ] **Step 5: Commit**

```bash
git add Backend/shared/middlewares/authentication.js Backend/shared/middlewares/authentication.test.js
git commit -m "refactor: name auth middleware functions for route-wiring tests"
```

---

### Task 3: Lock down product write routes

**Files:**
- Create: `Backend/shared/constants/roles.constants.js`
- Create: `Backend/modules/products/product.routes.test.js`
- Modify: `Backend/modules/products/product.routes.js`

**Interfaces:**
- Consumes: `checkAuthenticatedMiddleware`/`authorizeRolesMiddleware` names from Task 2.
- Produces: `ROLES.USER`, `ROLES.VENDOR`, `ROLES.ADMIN` constants — consumed by Task 4 too.

- [ ] **Step 1: Write the failing test**

Create `Backend/modules/products/product.routes.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/products/product.routes.test.js`
Expected: FAIL — all 3 assertions fail, current routes carry no auth middleware.

- [ ] **Step 3: Add the roles constants file**

Create `Backend/shared/constants/roles.constants.js`:

```js
export const ROLES = {
  USER: 'user',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};
```

- [ ] **Step 4: Wire auth into the routes**

In `Backend/modules/products/product.routes.js`, add the import (after the existing `preferenceAuth` import):

```js
import { ROLES } from '#shared/constants/roles.constants.js';
```

Replace:

```js
router
  .route('/product/new')
  .post(
    upload.fields([{ name: 'image', maxCount: 5 }]),
    validate(createProductSchema),
    createProduct
  );
```

with:

```js
router
  .route('/product/new')
  .post(
    checkAuthenticated(),
    authorizeRoles(ROLES.VENDOR, ROLES.ADMIN),
    upload.fields([{ name: 'image', maxCount: 5 }]),
    validate(createProductSchema),
    createProduct
  );
```

Replace:

```js
router
  .route('/product/:id')
  .put(validate(updateProductSchema), updateProduct)
  .delete(deleteProduct)
  .get(preferenceAuth(), getProductDetails);
```

with:

```js
router
  .route('/product/:id')
  .put(
    checkAuthenticated(),
    authorizeRoles(ROLES.VENDOR, ROLES.ADMIN),
    validate(updateProductSchema),
    updateProduct
  )
  .delete(checkAuthenticated(), authorizeRoles(ROLES.VENDOR, ROLES.ADMIN), deleteProduct)
  .get(preferenceAuth(), getProductDetails);
```

(`authorizeRoles` and `checkAuthenticated` are already imported at the top of this file — no new import needed for those two.)

- [ ] **Step 5: Run test to verify it passes**

Run: `cd Backend && node --test modules/products/product.routes.test.js`
Expected: PASS (3/3)

- [ ] **Step 6: Commit**

```bash
git add Backend/shared/constants/roles.constants.js Backend/modules/products/product.routes.js Backend/modules/products/product.routes.test.js
git commit -m "fix: require auth + vendor/admin role on product write routes"
```

---

### Task 4: Lock down order routes

**Files:**
- Create: `Backend/modules/orders/order.routes.test.js`
- Modify: `Backend/modules/orders/order.routes.js`

**Interfaces:**
- Consumes: `checkAuthenticatedMiddleware`/`authorizeRolesMiddleware` (Task 2), `ROLES` (Task 3).

- [ ] **Step 1: Write the failing test**

Create `Backend/modules/orders/order.routes.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/orders/order.routes.test.js`
Expected: FAIL — 4 of 5 fail (only `/order/new`, not tested here, already has auth).

- [ ] **Step 3: Wire auth into the routes**

Replace the full contents of `Backend/modules/orders/order.routes.js`:

```js
import express from 'express';

import {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  stripeWebhook,
} from '#modules/orders/order.controller.js';
import { checkAuthenticated, authorizeRoles } from '#shared/middlewares/authentication.js';
import { ROLES } from '#shared/constants/roles.constants.js';

const router = express.Router();

router.route('/order/new').post(checkAuthenticated(), createNewOrder);

router.route('/webhook').post(express.raw({ type: 'application/json' }), stripeWebhook);

router.route('/order/:id').get(checkAuthenticated(), getSingleOrder);

router.route('/orders/me').get(checkAuthenticated(), myOrders);

router.route('/orders').get(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), getAllOrders);

router
  .route('/order/update/:id')
  .put(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), updateOrderStatus);

router
  .route('/order/delete/:id')
  .delete(checkAuthenticated(), authorizeRoles(ROLES.ADMIN), deleteOrder);

export default router;
```

(The `/webhook` route's `express.raw()` is removed in Task 5, not here — leave it as-is for this task so the diff stays scoped to auth.)

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test modules/orders/order.routes.test.js`
Expected: PASS (5/5)

- [ ] **Step 5: Commit**

```bash
git add Backend/modules/orders/order.routes.js Backend/modules/orders/order.routes.test.js
git commit -m "fix: require auth + admin role on order read/admin routes"
```

---

### Task 5: Fix the Stripe webhook to verify real signatures

**Files:**
- Create: `Backend/modules/orders/order.webhook.js`
- Create: `Backend/modules/orders/order.webhook.test.js`
- Modify: `Backend/modules/orders/order.controller.js` (the `stripeWebhook` handler)
- Modify: `Backend/modules/orders/order.routes.js` (remove per-route `express.raw()`)
- Modify: `Backend/index.js` (dedupe body-parser middleware, capture raw body for signature verification)

**Interfaces:**
- Produces: `verifyStripeWebhookEvent(rawBody: Buffer, signatureHeader: string, endpointSecret: string) => Stripe.Event` — throws if the signature doesn't match. Consumed by `order.controller.js`'s `stripeWebhook`.
- Consumes: `req.rawBody` (Buffer) set by `index.js`'s `express.json({ verify })`.

- [ ] **Step 1: Write the failing test**

Create `Backend/modules/orders/order.webhook.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/orders/order.webhook.test.js`
Expected: FAIL — `Cannot find module '#modules/orders/order.webhook.js'`

- [ ] **Step 3: Write the implementation**

Create `Backend/modules/orders/order.webhook.js`:

```js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

export function verifyStripeWebhookEvent(rawBody, signatureHeader, endpointSecret) {
  return stripe.webhooks.constructEvent(rawBody, signatureHeader, endpointSecret);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test modules/orders/order.webhook.test.js`
Expected: PASS (3/3)

- [ ] **Step 5: Capture the raw body in `index.js` and dedupe the doubled middleware block**

In `Backend/index.js`, replace lines 37-48:

```js
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Database connection

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
```

with:

```js
app.use(
  express.json({
    limit: '16kb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
```

(This removes the accidental duplicate registration of the same four middlewares that was previously there, and adds `verify` so `req.rawBody` — the exact bytes Stripe signed — is available on every request without a second body-parser pass.)

- [ ] **Step 6: Remove the now-unnecessary `express.raw()` from the webhook route**

In `Backend/modules/orders/order.routes.js`, replace:

```js
router.route('/webhook').post(express.raw({ type: 'application/json' }), stripeWebhook);
```

with:

```js
router.route('/webhook').post(stripeWebhook);
```

- [ ] **Step 7: Replace the fake verification in the controller**

In `Backend/modules/orders/order.controller.js`, add the import (with the other local imports):

```js
import { verifyStripeWebhookEvent } from '#modules/orders/order.webhook.js';
```

Replace the `stripeWebhook` handler's verification block (lines 163-179):

```js
export const stripeWebhook = catchAsyncErrors(async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    logger.error('Webhook error:', error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
```

with:

```js
export const stripeWebhook = catchAsyncErrors(async (req, res) => {
  let event;

  try {
    const signature = req.headers['stripe-signature'];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    event = verifyStripeWebhookEvent(req.rawBody, signature, secret);
  } catch (error) {
    logger.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
```

- [ ] **Step 8: Run the full order test suite to confirm nothing regressed**

Run: `cd Backend && node --test modules/orders/`
Expected: PASS on all files (`order.pricing.test.js`, `order.routes.test.js`, `order.webhook.test.js`).

- [ ] **Step 9: Commit**

```bash
git add Backend/modules/orders/order.webhook.js Backend/modules/orders/order.webhook.test.js Backend/modules/orders/order.controller.js Backend/modules/orders/order.routes.js Backend/index.js
git commit -m "fix: verify real Stripe webhook signatures instead of self-generated test headers"
```

---

### Task 6: Fix the order-status enum casing bug

**Files:**
- Modify: `Backend/modules/orders/order.controller.js:283-289`

**Interfaces:**
- None (self-contained bugfix in `updateOrderStatus`).

- [ ] **Step 1: Write the failing test**

Add to `Backend/modules/orders/order.pricing.test.js` — wait, this guard isn't pricing logic. Create a new focused test file instead: `Backend/modules/orders/order.statusGuard.test.js`:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/orders/order.statusGuard.test.js`
Expected: FAIL — `Cannot find module '#modules/orders/order.statusGuard.js'`

- [ ] **Step 3: Write the implementation**

Create `Backend/modules/orders/order.statusGuard.js`:

```js
export function isAlreadyDelivered(order) {
  return order.orderStatus === 'delivered';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test modules/orders/order.statusGuard.test.js`
Expected: PASS (3/3)

- [ ] **Step 5: Wire it into the controller**

In `Backend/modules/orders/order.controller.js`, add the import:

```js
import { isAlreadyDelivered } from '#modules/orders/order.statusGuard.js';
```

Replace:

```js
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === 'Delivered') {
```

with:

```js
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (isAlreadyDelivered(order)) {
```

- [ ] **Step 6: Commit**

```bash
git add Backend/modules/orders/order.statusGuard.js Backend/modules/orders/order.statusGuard.test.js Backend/modules/orders/order.controller.js
git commit -m "fix: order-status enum casing mismatch that made the already-delivered guard dead code"
```

---

### Task 7: Fix stale paginated-product cache after writes

**Files:**
- Create: `Backend/shared/utils/productCacheVersion.js`
- Create: `Backend/shared/utils/productCacheVersion.test.js`
- Modify: `Backend/modules/products/product.controller.js`

**Interfaces:**
- Produces: `getCacheVersion(redisClient) => Promise<number>`, `bumpCacheVersion(redisClient) => Promise<number>` — consumed by `getPaginatedProducts` (read) and `createProduct`/`updateProduct`/`deleteProduct`/`createProductReview`/`deleteProductReview` (bump on write).

**Approach:** rather than tracking every filtered/sorted cache key to delete on write (fragile — the key depends on 7 independent query params), keep a single Redis counter (`products:cache:version`) that every paginated cache key includes. Any write bumps the counter, which instantly invalidates every previously-cached paginated key without deleting them one by one (they just expire naturally via the existing 1hr TTL and are never read again since the key no longer matches).

- [ ] **Step 1: Write the failing test**

Create `Backend/shared/utils/productCacheVersion.test.js`. This uses a minimal in-memory fake of the two ioredis calls used (`get`, `incr`) rather than a real Redis connection, since this repo has no test Redis instance configured:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

import { getCacheVersion, bumpCacheVersion } from '#shared/utils/productCacheVersion.js';

function makeFakeRedis() {
  const store = new Map();
  return {
    async get(key) {
      return store.has(key) ? String(store.get(key)) : null;
    },
    async incr(key) {
      const next = (store.get(key) || 0) + 1;
      store.set(key, next);
      return next;
    },
  };
}

test('getCacheVersion defaults to 1 when no version has been set yet', async () => {
  const redis = makeFakeRedis();
  const version = await getCacheVersion(redis);
  assert.equal(version, 1);
});

test('bumpCacheVersion increments and getCacheVersion reflects the new value', async () => {
  const redis = makeFakeRedis();
  await getCacheVersion(redis); // establishes version 1
  const bumped = await bumpCacheVersion(redis);
  assert.equal(bumped, 2);
  assert.equal(await getCacheVersion(redis), 2);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test shared/utils/productCacheVersion.test.js`
Expected: FAIL — `Cannot find module '#shared/utils/productCacheVersion.js'`

- [ ] **Step 3: Write the implementation**

Create `Backend/shared/utils/productCacheVersion.js`:

```js
const VERSION_KEY = 'products:cache:version';

export async function getCacheVersion(redisClient) {
  const value = await redisClient.get(VERSION_KEY);
  if (value) return Number(value);

  await redisClient.incr(VERSION_KEY);
  return 1;
}

export async function bumpCacheVersion(redisClient) {
  return redisClient.incr(VERSION_KEY);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test shared/utils/productCacheVersion.test.js`
Expected: PASS (2/2)

- [ ] **Step 5: Wire the version into the paginated cache key**

In `Backend/modules/products/product.controller.js`, add the import (with the other local imports):

```js
import { getCacheVersion, bumpCacheVersion } from '#shared/utils/productCacheVersion.js';
```

In `getPaginatedProducts`, replace the cache-key block:

```js
  /* ------------------ REDIS CACHE KEY ------------------ */
  const cacheKey = [
    'products',
    `p:${page}`,
```

with:

```js
  /* ------------------ REDIS CACHE KEY ------------------ */
  const cacheVersion = await getCacheVersion(redisClient);
  const cacheKey = [
    'products',
    `v:${cacheVersion}`,
    `p:${page}`,
```

- [ ] **Step 6: Bump the version on every write path**

In `createProduct`, replace:

```js
  // Clear cache for product list
  await redisClient.del('all_products');
```

with:

```js
  // Clear cache for product list
  await redisClient.del('all_products');
  await bumpCacheVersion(redisClient);
```

In `updateProduct`, replace:

```js
  await redisClient.del('all_products');
  await redisClient.del(`product_${productId}`);
```

with:

```js
  await redisClient.del('all_products');
  await redisClient.del(`product_${productId}`);
  await bumpCacheVersion(redisClient);
```

In `deleteProduct`, replace:

```js
  await redisClient.del('all_products');
  await redisClient.del(`product_${req.params.id}`);
```

with:

```js
  await redisClient.del('all_products');
  await redisClient.del(`product_${req.params.id}`);
  await bumpCacheVersion(redisClient);
```

(Reviews change `ratings`, which the paginated listing can filter/sort by via `minRating` — bump there too. In `createProductReview`, replace `await redisClient.del(\`product_${productId}\`);` with the same two lines plus the bump; do the same in `deleteProductReview`.)

- [ ] **Step 7: Run the full product test suite**

Run: `cd Backend && node --test modules/products/ shared/utils/productCacheVersion.test.js`
Expected: All PASS.

- [ ] **Step 8: Commit**

```bash
git add Backend/shared/utils/productCacheVersion.js Backend/shared/utils/productCacheVersion.test.js Backend/modules/products/product.controller.js
git commit -m "fix: invalidate paginated product cache on write via version counter"
```

---

### Task 8: Delete dead cache helper

**Files:**
- Delete: `Backend/infra/redis/redisCache.js`

- [ ] **Step 1: Confirm nothing imports it**

Run: `cd Backend && grep -rn "redisCache\|getOrSetCache" --include=*.js . | grep -v node_modules`
Expected: only the file's own definition line (already confirmed during the audit — no importers anywhere in the repo).

- [ ] **Step 2: Delete it**

```bash
git rm Backend/infra/redis/redisCache.js
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove dead cache helper (unused, referenced redisClient without importing it)"
```

---

### Task 9: Add missing Order indexes

**Files:**
- Create: `Backend/modules/orders/order.model.test.js`
- Modify: `Backend/modules/orders/order.model.js`

**Interfaces:**
- None external — schema-level change only.

- [ ] **Step 1: Write the failing test**

Create `Backend/modules/orders/order.model.test.js`. This inspects the Mongoose schema's declared indexes directly — no live MongoDB connection required:

```js
import test from 'node:test';
import assert from 'node:assert/strict';

import Order from '#modules/orders/order.model.js';

function hasIndexOn(fieldName) {
  return Order.schema.indexes().some(([spec]) => Object.prototype.hasOwnProperty.call(spec, fieldName));
}

test('Order schema has an index on user (used by myOrders lookup)', () => {
  assert.ok(hasIndexOn('user'), 'expected an index containing the "user" field');
});

test('Order schema has an index on orderStatus (used by admin status filtering)', () => {
  assert.ok(hasIndexOn('orderStatus'), 'expected an index containing the "orderStatus" field');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd Backend && node --test modules/orders/order.model.test.js`
Expected: FAIL — 2/2, no indexes declared beyond the default `_id`.

- [ ] **Step 3: Add the indexes**

In `Backend/modules/orders/order.model.js`, before the `const Order = mongoose.model('Order', orderSchema);` line, add:

```js
orderSchema.index({ user: 1, createdAt: -1 }, { name: 'UserOrdersIndex' });

orderSchema.index({ orderStatus: 1, createdAt: -1 }, { name: 'OrderStatusIndex' });
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd Backend && node --test modules/orders/order.model.test.js`
Expected: PASS (2/2)

- [ ] **Step 5: Commit**

```bash
git add Backend/modules/orders/order.model.js Backend/modules/orders/order.model.test.js
git commit -m "fix: add missing indexes on Order.user and Order.orderStatus"
```

---

## Post-plan: run everything together

- [ ] Run: `cd Backend && node --test --test-reporter=spec modules/ shared/`
- [ ] Expected: every test file listed above passes, zero failures.
- [ ] Manually start the server (`npm run dev` in `Backend/`) and confirm it boots without the duplicate-middleware warning path and without crashing — this alone doesn't prove checkout works end-to-end (that needs a real Mongo + Redis + Stripe test-mode setup, out of scope for this plan), but it proves nothing in this diff broke module resolution or route registration.
