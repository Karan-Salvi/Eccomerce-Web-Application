import http from 'k6/http';
import { check, sleep } from 'k6';

/* global __ENV, __VU */

// Target the local dev backend by default — override with:
//   k6 run -e BASE_URL=http://127.0.0.1:8000/api/v1 loadtest/browse.js
const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const options = {
  scenarios: {
    browsing: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 20 }, // ramp up to 20 concurrent browsers
        { duration: '1m', target: 20 }, // hold at 20 for a minute
        { duration: '15s', target: 0 }, // ramp down
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // fewer than 1% of requests should fail
    http_req_duration: ['p(95)<800'], // 95% of requests under 800ms
  },
};

export default function () {
  // Each virtual user picks one of the 50 seeded buyers, spread across VUs
  // by __VU (k6's 1-indexed virtual-user id) so concurrent VUs don't all
  // hammer the same account/session.
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
  const authHeaders = { headers: { Cookie: cookieHeader } };

  sleep(1);

  const listRes = http.get(`${BASE_URL}/product?page=1&limit=12`, authHeaders);
  check(listRes, { 'product list loaded': (r) => r.status === 200 });

  if (listRes.status !== 200) return;

  sleep(1);

  const listBody = JSON.parse(listRes.body);
  const products = listBody.data || [];
  if (products.length > 0) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const detailRes = http.get(`${BASE_URL}/product/${randomProduct._id}`, authHeaders);
    check(detailRes, { 'product detail loaded': (r) => r.status === 200 });

    // Add call to recommendation engine since it's already landed
    const similarRes = http.get(
      `${BASE_URL}/recommendations/similar/${randomProduct._id}`,
      authHeaders
    );
    check(similarRes, { 'similar products loaded': (r) => r.status === 200 });
  }

  sleep(1);
}
