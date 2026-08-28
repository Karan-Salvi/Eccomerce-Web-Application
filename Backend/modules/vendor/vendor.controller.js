import Product from '#modules/products/product.model.js';
import Order from '#modules/orders/order.model.js';
import catchAsyncErrors from '#shared/middlewares/catchAsyncErrors.js';

// getMyProducts accepts an optional 4th `deps` argument so unit tests can
// inject a fake Product model without touching the real DB. catchAsyncErrors
// only forwards (req, res, next), so the exported route handler below curries
// deps away — the raw named export stays directly unit-testable.
export async function getMyProductsHandler(req, res, next, { productModel = Product } = {}) {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 100);
  const skip = (page - 1) * limit;

  const filter = { createdBy: req.user._id };

  const [products, totalProducts] = await Promise.all([
    productModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    productModel.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    data: products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  });
}

export async function getMyProducts(req, res, next, deps) {
  return getMyProductsHandler(req, res, next, deps);
}

export const getMyProductsRoute = catchAsyncErrors((req, res) => getMyProductsHandler(req, res));

export async function getMyOrdersHandler(req, res, next, { orderModel = Order } = {}) {
  const orders = await orderModel
    .find({ 'orderItems.vendor': req.user._id })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
}

export async function getMyOrders(req, res, next, deps) {
  return getMyOrdersHandler(req, res, next, deps);
}

export const getMyOrdersRoute = catchAsyncErrors((req, res) => getMyOrdersHandler(req, res));

export async function getMyAnalyticsHandler(
  req,
  res,
  next,
  { productModel = Product, orderModel = Order } = {}
) {
  const vendorId = req.user._id;

  const [products, orders] = await Promise.all([
    productModel.find({ createdBy: vendorId }),
    orderModel
      .find({ 'orderItems.vendor': vendorId, orderStatus: { $ne: 'cancelled' } })
      .sort({ createdAt: -1 }),
  ]);

  const productById = new Map(products.map((p) => [String(p._id), p]));

  const salesByProduct = new Map(); // productId -> units sold
  let totalSales = 0;
  let totalRevenue = 0;
  const ordersWithThisVendor = new Set();
  const monthlyBuckets = new Map(); // 'YYYY-M' -> { sales, revenue }
  const categoryRevenue = new Map(); // category -> revenue

  for (const order of orders) {
    const myItems = order.orderItems.filter((item) => String(item.vendor) === String(vendorId));
    if (myItems.length === 0) continue;

    ordersWithThisVendor.add(String(order._id));

    for (const item of myItems) {
      totalSales += item.quantity;
      totalRevenue += item.price * item.quantity;

      const productIdStr = String(item.product);
      salesByProduct.set(productIdStr, (salesByProduct.get(productIdStr) || 0) + item.quantity);

      const monthKey = `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}`;
      const bucket = monthlyBuckets.get(monthKey) || { sales: 0, revenue: 0 };
      bucket.sales += item.quantity;
      bucket.revenue += item.price * item.quantity;
      monthlyBuckets.set(monthKey, bucket);

      const category = productById.get(productIdStr)?.category;
      if (category) {
        categoryRevenue.set(
          category,
          (categoryRevenue.get(category) || 0) + item.price * item.quantity
        );
      }
    }
  }

  let topSellingProduct = 'N/A';
  let topSales = 0;
  for (const [productIdStr, sales] of salesByProduct) {
    if (sales > topSales) {
      topSales = sales;
      topSellingProduct = productById.get(productIdStr)?.name || 'N/A';
    }
  }

  const averageOrderValue =
    ordersWithThisVendor.size > 0 ? totalRevenue / ordersWithThisVendor.size : 0;

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const salesTrend = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = monthlyBuckets.get(key) || { sales: 0, revenue: 0 };
    salesTrend.push({
      month: monthNames[d.getMonth()],
      sales: bucket.sales,
      revenue: bucket.revenue,
    });
  }

  const categoryCounts = new Map();
  for (const p of products) {
    if (p.category) categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1);
  }
  const categoryDistribution = Array.from(categoryCounts.entries()).map(([category, count]) => ({
    category,
    count,
    percentage: products.length > 0 ? (count / products.length) * 100 : 0,
  }));

  const revenueByCategory = Array.from(categoryRevenue.entries()).map(([category, revenue]) => ({
    category,
    revenue,
  }));

  return res.status(200).json({
    success: true,
    message: 'Analytics fetched successfully',
    data: {
      totalProducts: products.length,
      totalSales,
      totalRevenue,
      averageOrderValue,
      topSellingProduct,
      salesTrend,
      categoryDistribution,
      revenueByCategory,
    },
  });
}

export async function getMyAnalytics(req, res, next, deps) {
  return getMyAnalyticsHandler(req, res, next, deps);
}

export const getMyAnalyticsRoute = catchAsyncErrors((req, res) => getMyAnalyticsHandler(req, res));
