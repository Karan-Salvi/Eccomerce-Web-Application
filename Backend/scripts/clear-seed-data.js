import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '#modules/users/user.model.js';
import Product from '#modules/products/product.model.js';
import Order from '#modules/orders/order.model.js';

dotenv.config({ path: './.env' });

const SEED_BATCH = 'loadtest-2026-08-28';

async function main() {
  await mongoose.connect(process.env.MONGODB_URL + process.env.DATABASE_NAME);

  const [users, products, orders] = await Promise.all([
    User.deleteMany({ seedBatch: SEED_BATCH }),
    Product.deleteMany({ seedBatch: SEED_BATCH }),
    Order.deleteMany({ seedBatch: SEED_BATCH }),
  ]);

  console.log(
    `Cleared seed batch "${SEED_BATCH}": ${users.deletedCount} users, ${products.deletedCount} products, ${orders.deletedCount} orders.`
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Clear failed:', err);
  process.exit(1);
});
