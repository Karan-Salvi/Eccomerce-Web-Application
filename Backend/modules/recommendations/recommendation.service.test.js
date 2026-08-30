import test from 'node:test';
import assert from 'node:assert/strict';

import {
  computeCooccurrence,
  mergeScoreMaps,
} from '#modules/recommendations/recommendation.service.js';

test('computeCooccurrence counts how often other products co-occur with the target across orders', () => {
  const orders = [
    { _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }] },
    { _id: 'o2', orderItems: [{ product: 'p1' }, { product: 'p2' }, { product: 'p3' }] },
    { _id: 'o3', orderItems: [{ product: 'p1' }, { product: 'p3' }] },
    { _id: 'o4', orderItems: [{ product: 'p4' }] }, // doesn't contain p1 — ignored entirely
  ];

  const result = computeCooccurrence(orders, 'p1');

  assert.deepEqual(
    result,
    [
      { productId: 'p3', score: 2 },
      { productId: 'p2', score: 2 },
    ].sort((a, b) => b.score - a.score || a.productId.localeCompare(b.productId))
  );
});

test('computeCooccurrence never includes the target product itself', () => {
  const orders = [{ _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p1' }] }];
  // A malformed/duplicate line-item edge case: even if p1 appears twice in
  // one order's items, it must never recommend itself.
  const result = computeCooccurrence(orders, 'p1');
  assert.deepEqual(result, []);
});

test('computeCooccurrence returns an empty array when the target has no orders', () => {
  const result = computeCooccurrence([], 'p1');
  assert.deepEqual(result, []);
});

test('computeCooccurrence counts each order at most once per co-occurring product, even with duplicate line items', () => {
  // Same product appearing twice in one order (e.g. two different variants)
  // must not double-count that single order's co-occurrence signal.
  const orders = [
    { _id: 'o1', orderItems: [{ product: 'p1' }, { product: 'p2' }, { product: 'p2' }] },
  ];
  const result = computeCooccurrence(orders, 'p1');
  assert.deepEqual(result, [{ productId: 'p2', score: 1 }]);
});

test('mergeScoreMaps combines multiple score arrays, summing scores for repeated productIds', () => {
  const merged = mergeScoreMaps(
    [
      [
        { productId: 'p2', score: 3 },
        { productId: 'p3', score: 1 },
      ],
      [
        { productId: 'p2', score: 2 },
        { productId: 'p4', score: 5 },
      ],
    ],
    10
  );

  assert.deepEqual(merged, [
    { productId: 'p2', score: 5 },
    { productId: 'p4', score: 5 },
    { productId: 'p3', score: 1 },
  ]);
});

test('mergeScoreMaps respects the limit', () => {
  const merged = mergeScoreMaps(
    [
      [
        { productId: 'p1', score: 3 },
        { productId: 'p2', score: 2 },
        { productId: 'p3', score: 1 },
      ],
    ],
    2
  );
  assert.equal(merged.length, 2);
  assert.deepEqual(
    merged.map((r) => r.productId),
    ['p1', 'p2']
  );
});

test('mergeScoreMaps excludes a given set of productIds (e.g. products the user already owns)', () => {
  const merged = mergeScoreMaps(
    [
      [
        { productId: 'p1', score: 3 },
        { productId: 'p2', score: 2 },
      ],
    ],
    10,
    new Set(['p1'])
  );
  assert.deepEqual(merged, [{ productId: 'p2', score: 2 }]);
});
