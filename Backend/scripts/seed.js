import mongoose from 'mongoose';
import dotenv from 'dotenv';

import User from '#modules/users/user.model.js';
import Product, { PRODUCT_CATEGORIES } from '#modules/products/product.model.js';
import Order from '#modules/orders/order.model.js';

dotenv.config({ path: './.env' });

const SEED_BATCH = 'loadtest-2026-08-28';
const VENDOR_COUNT = 5;
const PRODUCTS_PER_VENDOR = 30;
const BUYER_COUNT = 50;
const ORDER_COUNT = 200;

const PLACEHOLDER_IMAGE = { url: 'https://placehold.co/400x400?text=Seed+Product' };

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function seedVendors() {
  const vendors = [];
  for (let i = 0; i < VENDOR_COUNT; i++) {
    const vendor = await User.create({
      name: `Seed Vendor ${i + 1}`,
      email: `seed-vendor-${i + 1}@loadtest.local`,
      password: 'password123',
      role: 'vendor',
      seedBatch: SEED_BATCH,
    });
    vendors.push(vendor);
  }
  return vendors;
}

async function seedBuyers() {
  const buyers = [];
  for (let i = 0; i < BUYER_COUNT; i++) {
    const buyer = await User.create({
      name: `Seed Buyer ${i + 1}`,
      email: `seed-buyer-${i + 1}@loadtest.local`,
      password: 'password123',
      role: 'user',
      seedBatch: SEED_BATCH,
    });
    buyers.push(buyer);
  }
  return buyers;
}

async function seedProducts(vendors) {
  const products = [];
  for (const vendor of vendors) {
    for (let i = 0; i < PRODUCTS_PER_VENDOR; i++) {
      const category = randomFrom(PRODUCT_CATEGORIES);
      const price = Math.round((Math.random() * 4000 + 100) * 100) / 100;
      const product = await Product.create({
        name: `${category} Item ${vendor.name.split(' ').pop()}-${i + 1}`,
        description: `Seed-generated ${category.toLowerCase()} product for load testing.`,
        price,
        originalPrice: price,
        category,
        inStock: Math.floor(Math.random() * 200) + 10,
        images: [PLACEHOLDER_IMAGE],
        createdBy: vendor._id,
        seedBatch: SEED_BATCH,
      });
      products.push(product);
    }
  }
  return products;
}

async function seedOrders(buyers, products) {
  for (let i = 0; i < ORDER_COUNT; i++) {
    const buyer = randomFrom(buyers);
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    let itemsPrice = 0;

    for (let j = 0; j < itemCount; j++) {
      const product = randomFrom(products);
      const quantity = Math.floor(Math.random() * 3) + 1;
      orderItems.push({
        product: product._id,
        vendor: product.createdBy,
        price: product.price,
        quantity,
      });
      itemsPrice += product.price * quantity;
    }

    const taxPrice = 18;
    const shippingPrice = 50;
    const totalPrice = itemsPrice + itemsPrice * (taxPrice / 100) + shippingPrice;

    await Order.create({
      shippingInfo: {
        address: '123 Load Test Street',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        pinCode: 411001,
        phoneNo: 9000000000 + i,
      },
      orderItems,
      user: buyer._id,
      paymentMethod: 'cod',
      paymentInfo: { id: 'COD', status: 'pending' },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: randomFrom(['processing', 'shipped', 'delivered']),
      seedBatch: SEED_BATCH,
    });
  }
}

async function main() {
  if (process.env.SEED_CONFIRM !== 'yes') {
    console.error(
      'Refusing to run: this creates bulk data against MONGODB_URL from your .env.\n' +
        `Target: ${process.env.MONGODB_URL}${process.env.DATABASE_NAME}\n` +
        'If that is the database you intend to seed (a local/dev database, never production),\n' +
        're-run as: SEED_CONFIRM=yes npm run seed'
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URL + process.env.DATABASE_NAME);

  const existing = await User.countDocuments({ seedBatch: SEED_BATCH });
  if (existing > 0) {
    console.log(
      `Seed batch "${SEED_BATCH}" already exists (${existing} users) — skipping, not re-seeding.`
    );
    console.log('Run `npm run seed:clear` first if you want to regenerate it.');
    await mongoose.disconnect();
    return;
  }

  console.log('Seeding vendors...');
  const vendors = await seedVendors();
  console.log('Seeding buyers...');
  const buyers = await seedBuyers();
  console.log('Seeding products...');
  const products = await seedProducts(vendors);
  console.log('Seeding orders...');
  await seedOrders(buyers, products);

  console.log(
    `Done. Seeded ${vendors.length} vendors, ${buyers.length} buyers, ${products.length} products, ${ORDER_COUNT} orders.`
  );
  console.log('All seeded users share the password: password123');
  console.log('Example login for load testing: seed-buyer-1@loadtest.local / password123');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
