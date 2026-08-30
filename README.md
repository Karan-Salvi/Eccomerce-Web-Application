# CartLoop 🛒

A multi-vendor e-commerce marketplace I built to actually understand what it takes to run a real storefront — not just "add product, show product," but the messier stuff: stock going negative under concurrent checkouts, a Stripe webhook arriving twice, a vendor who shouldn't be able to see another vendor's orders, an admin who could accidentally demote themselves out of their own account. Shoppers, vendors, and admins all share one Express API — same routes, role checked per request, no separate deployments to keep in sync.

**Live:** [cartloop.vercel.app](https://cartloop.vercel.app) — poke around, it's a real working app, not a demo shell.

---

## What's in it

**Storefront** — browse, filter, and search a paginated catalog; product pages with reviews and ratings; wishlist; cart; checkout with Cash on Delivery or Stripe; order tracking; and two flavors of recommendations — "people who bought this also bought" (order co-occurrence) and a "for you" feed that quietly learns from what you've viewed.

**Vendor dashboard** — sales analytics, full product CRUD with multi-image upload straight to Cloudinary, and a proper detail view for each listing.

**Admin console** — store-wide stats, user management (change roles, delete accounts — with a guard rail so an admin can't lock themselves out by accident), product moderation, order status control.

**Auth** — JWT in an httpOnly cookie, register/login/logout, forgot/reset password, the usual profile and password updates.

---

## Tech stack

**Frontend** — React 19, Vite, Tailwind CSS v4, Redux Toolkit + RTK Query, React Router v7, shadcn/ui on top of Radix, lucide-react, Motion, Recharts, Sonner.

**Backend** — Node.js, Express, MongoDB + Mongoose, Redis (ioredis) sitting in front of Mongo as a read-through cache, Cloudinary for images, Stripe Checkout with a webhook-verified and idempotent reconciliation step, Zod for validation, JWT auth, Winston for logs, express-rate-limit to keep the API honest.

**Tooling** — ESLint + Prettier, Node's built-in test runner (no Jest, just `node --test`), GitHub Actions running lint + test on every push and PR.

---

## Getting started

You'll need:

- Node.js v18+
- MongoDB (local or Atlas)
- Redis (local or cloud)
- A Cloudinary account, a Stripe account (test mode's fine for local dev), and an SMTP sender for password-reset emails

```bash
git clone https://github.com/Karan-Salvi/Eccomerce-Web-Application.git
cd Eccomerce-Web-Application
```

### Backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```bash
PORT=
MONGODB_URL=
DATABASE_NAME=
FRONTEND_URI=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
TOKEN_NAME=
SMPT_SERVICE=
SMPT_MAIL=
SMPT_PASSWORD=
HOST=
EMAIL_PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
STRIPE_SECRET_KEY=
WEBHOOK_ENDPOINT_SECRET=
NODE_ENV=development
```

> Heads up: `NODE_ENV=production` isn't just cosmetic here. The login cookie only gets issued as `SameSite=None; Secure` when it's set — and if your frontend and backend live on different domains (like the deployed version does), that's the difference between staying logged in and getting silently signed out on every reload.

```bash
npm run dev       # start the API
npm test          # run the backend test suite
npm run validate  # lint + test — same checks CI runs
```

### Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```bash
VITE_API_URL=
```

```bash
npm run dev       # start the dev server
npm run validate  # lint + build — same checks CI runs
```

### Stripe payments

Checkout uses Stripe Checkout Sessions (`mode: payment`, card only). Stock gets reserved — decremented — the moment an order is created, before the shopper even reaches Stripe's page. That means the webhook has to be the source of truth for what actually happened to the money afterward.

| Event | Handled by | Effect |
|---|---|---|
| `checkout.session.completed` | `processStripeWebhookEvent` (`Backend/modules/orders/order.controller.js`) | Marks the order `paymentInfo.status: 'completed'`, sets `paidAt`. |
| `checkout.session.expired` | same function | Releases the reserved stock, marks the order `paymentInfo.status: 'failed'` / `orderStatus: 'cancelled'`. Fires automatically ~24h after an abandoned checkout. |

**Security** — every webhook request's `Stripe-Signature` header gets verified against `WEBHOOK_ENDPOINT_SECRET` before anything in the payload is trusted (`Backend/modules/orders/order.webhook.js`). No valid signature, no DB write — rejected with 400, full stop.

**Idempotency** — Stripe retries webhooks, sometimes more than once for the same event. Each event id gets claimed in Redis (`markEventProcessed`, `Backend/shared/utils/idempotency.js`) before it's processed, so a retry just returns a no-op 200 instead of crediting or cancelling an order twice.

**Local testing:**

```bash
stripe listen --forward-to localhost:8001/api/v1/webhook
# copy the printed whsec_... into Backend/.env as WEBHOOK_ENDPOINT_SECRET, restart the server
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
```

(Adjust the port if `Backend/.env`'s `PORT` differs from 8001.)

---

## Screens

### Landing

![Landing page](assets/Landing_Page.png)

### Products

| | |
|---|---|
| ![Product listing](assets/Product_Page.png) | ![Product detail](assets/Product_Detail_Page.png) |

### Cart & checkout

| | | |
|---|---|---|
| ![Cart](assets/Cart_Page.png) | ![Empty cart](assets/CartEmpty_Page.png) | ![Checkout](assets/CheckOut_Page.png) |
| ![Payment success](assets/Payment_Success_Page.png) | ![Payment cancelled](assets/Payment_Cancelled.png) | |

### Wishlist

![Wishlist](assets/Wishlist_Page.png)

### Account

| | | |
|---|---|---|
| ![Login](assets/Login_Page.png) | ![Register](assets/Register_Page.png) | ![Profile](assets/Profile_Page.png) |

### About & contact

| | |
|---|---|
| ![About](assets/About_Page.png) | ![Contact](assets/Contact_Page.png) |

### Vendor dashboard

| | | |
|---|---|---|
| ![Vendor dashboard](assets/Vendor_Dashboard_Page.png) | ![Vendor product management](assets/Vendor_ProductManagement_Page.png) | ![Vendor add product](assets/Vendor_AddProduct_Page.png) |

### Admin console

| | |
|---|---|
| ![Admin dashboard](assets/Admin_Dashboard.png) | ![Admin users](assets/Admin_user_Page.png) |
| ![Admin products](assets/Admin_Product_Page.png) | ![Admin orders](assets/Admin_Order_Page.png) |

---

## Architecture

### System design

![System design](assets/Cartloop_System_Design.png)

### Database design

![Database design](assets/CartLoop_Database_Design.png)

---

## What's next

- Docker, so "works on my machine" stops being the punchline
- WebSockets for real-time order status, instead of refreshing to check
- More frontend test coverage — the backend's well-tested, the frontend's still catching up

---

## Contributing

Fork it, branch it, send a PR. If you find a bug, I'd genuinely rather hear about it than not.

## License

[MIT](LICENSE) — do what you want with it.

## Say hi

- Email: karansalviwork@gmail.com
- Portfolio: [karansalvi.vercel.app](https://karansalvi.vercel.app/)
- GitHub: [@Karan-Salvi](https://github.com/Karan-Salvi)
