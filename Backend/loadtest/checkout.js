import http from 'k6/http';
import { check, sleep } from 'k6';

/* global __ENV, __VU, __ITER */

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const options = {
  scenarios: {
    checkout: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 }, // ramp up to 10 concurrent checkouts
        { duration: '40s', target: 10 }, // hold
        { duration: '10s', target: 0 }, // ramp down
      ],
    },
  },
  thresholds: {
    // Checkout failures are expected under real contention (insufficient
    // stock is a correct 409, not a bug) — the threshold here is generous
    // on purpose; read the `checks` breakdown, not just this pass/fail gate.
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  const buyerNum = (__VU % 50) + 1;
  const email = `seed-buyer-${buyerNum}@loadtest.local`;

  const loginRes = http.post(
    `${BASE_URL}/login`,
    JSON.stringify({ email, password: 'password123' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(loginRes, { 'login succeeded': (r) => r.status === 200 });

  if (loginRes.status !== 200) return;

  const cookies = loginRes.cookies;
  const cookieHeader = Object.keys(cookies)
    .map((name) => `${name}=${cookies[name][0].value}`)
    .join('; ');

  sleep(0.5);

  const listRes = http.get(`${BASE_URL}/product?page=1&limit=20`, {
    headers: { Cookie: cookieHeader },
  });

  if (listRes.status !== 200) return;

  const products = JSON.parse(listRes.body).data || [];
  if (products.length === 0) return;

  const product = products[Math.floor(Math.random() * products.length)];

  const orderRes = http.post(
    `${BASE_URL}/order/new`,
    JSON.stringify({
      shippingInfo: {
        address: '123 Load Test Street',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        pinCode: 411001,
        phoneNo: 9000000000 + __VU,
      },
      orderItems: [{ price: product.price, quantity: 1, product: product._id }],
      itemsPrice: product.price,
      taxPrice: 18,
      shippingPrice: 50,
      paymentMethod: 'cod',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
        // A fresh idempotency key per iteration — this script is testing
        // throughput under real concurrent distinct orders, not retry
        // dedup (that's already covered by this project's existing
        // idempotency unit tests) — a shared/reused key here would
        // silently collapse every VU's orders into one and understate
        // real load.
        'Idempotency-Key': `loadtest-${__VU}-${__ITER}-${Date.now()}`,
      },
    }
  );

  check(orderRes, {
    'order accepted or correctly rejected for stock': (r) => r.status === 201 || r.status === 409,
  });

  sleep(1);
}
