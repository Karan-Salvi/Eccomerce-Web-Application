// Item-based collaborative filtering: "products frequently bought alongside
// this one." Pure functions over plain arrays — no DB or cache access here,
// so they're trivially unit-testable and reusable from both the
// single-product and personalized-feed endpoints.

export function computeCooccurrence(orders, targetProductId) {
  const targetIdStr = String(targetProductId);
  const scoreByProduct = new Map();

  for (const order of orders) {
    const idsInThisOrder = new Set(order.orderItems.map((item) => String(item.product)));
    if (!idsInThisOrder.has(targetIdStr)) continue;

    for (const productIdStr of idsInThisOrder) {
      if (productIdStr === targetIdStr) continue;
      scoreByProduct.set(productIdStr, (scoreByProduct.get(productIdStr) || 0) + 1);
    }
  }

  return Array.from(scoreByProduct.entries())
    .map(([productId, score]) => ({ productId, score }))
    .sort((a, b) => b.score - a.score || a.productId.localeCompare(b.productId));
}

export function mergeScoreMaps(scoreMapArrays, limit, excludeProductIds = new Set()) {
  const combined = new Map();

  for (const scoreMap of scoreMapArrays) {
    for (const { productId, score } of scoreMap) {
      if (excludeProductIds.has(productId)) continue;
      combined.set(productId, (combined.get(productId) || 0) + score);
    }
  }

  return Array.from(combined.entries())
    .map(([productId, score]) => ({ productId, score }))
    .sort((a, b) => b.score - a.score || a.productId.localeCompare(b.productId))
    .slice(0, limit);
}
