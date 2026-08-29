# 🛒 CartLoop - Modern E-Commerce Platform

CartLoop is a high-performance, scalable, and secure e-commerce web application built with a modern tech stack. It features robust user authentication, advanced rate limiting, efficient caching using Redis, and primary data persistence with MongoDB. The frontend is designed using React, Tailwind CSS, and Redux Toolkit Query for an optimized developer and user experience.

---

### 🔗 Demo Link

Checkout the live demo of CartLoop:

👉 [https://cartloop.vercel.app](https://cartloop.vercel.app)

---

### ⭐ Give a Star

If you found this project helpful or inspiring, please consider giving it a star on GitHub 🌟

👉 [https://github.com/CartLoop](https://github.com/Karan-Salvi/Eccomerce-Web-Application)


---

### 📌 Flow Summary

1. **Frontend (React)** sends request (e.g., cart update or product fetch).
2. Request passes to **Authentication Service** which validates the token (JWT).
3. If authenticated, request is forwarded to the **Rate Limiting Service** to filter high-frequency/abusive requests.
4. Valid requests go to the **CartLoop Server**.
5. Server queries **Redis** (cache-first strategy).
   - If data found in Redis → returned immediately.
   - If not → fallback query to **MongoDB**, and the response is then cached in Redis for next time.
6. The processed response is sent back to the frontend.

---

## 🚀 Live Features

- 🔐 User Authentication (JWT)
- 🛒 Cart Management System
- 🧾 Order & Product APIs
- 🚦 Global Rate Limiting Middleware
- ⚡ Redis Caching for high-speed data access
- 📈 Optimized global state management using Redux Toolkit & RTK Query
- 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### 🌐 Frontend
- **React.js** — Component-based UI
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit** — State management
- **RTK Query** — Efficient data fetching
- **HTML5 / JSX**

### 🧠 Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web server
- **express-rate-limit** — Protects routes from excessive use
- **MongoDB** — Primary document database
- **Redis** — In-memory data caching
- **JWT** — Token-based authentication
- **Mongoose** — ODM for MongoDB

---


## ⚙️ Getting Started

### 🔧 Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- Redis Server (local or cloud)
- npm or yarn

---

Clone the repository:
   ```bash
   git clone https://github.com/Karan-Salvi/Eccomerce-Web-Application.git
   ```

### 🔌 Backend Setup

1. Install Dependancies:
   ```bash
   cd CartLoop/Backend
   npm install
   ```
2. Setup Environment Varibles:
   Create .env in Backend Directory paste given below
   ```bash
    PORT = 
    MONGODB_URL = 
    DATABASE_NAME=
    FRONTEND_URI = 
    REFRESH_TOKEN_SECRET = 
    REFRESH_TOKEN_EXPIRY =
    TOKEN_NAME  = 
    SMPT_SERVICE = 
    SMPT_MAIL = 
    SMPT_PASSWORD =
    HOST = 
    EMAIL_PORT = 
    CLOUDINARY_CLOUD_NAME = 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECRET = 
    REDIS_URL= 
    STRIPE_SECRET_KEY=
    WEBHOOK_ENDPOINT_SECRET=
    NODE_ENV = dev
   ```
3. Run the Backend:
   ```bash
   npm run dev
   ```

### Stripe payments

Checkout uses Stripe Checkout Sessions (`mode: payment`, card only). Stock is reserved
(decremented) at order-creation time, before the user reaches Stripe — so the webhook is
what reconciles that reservation with what actually happened to the payment:

| Event | Handled by | Effect |
|---|---|---|
| `checkout.session.completed` | `processStripeWebhookEvent` (`Backend/modules/orders/order.controller.js`) | Marks the order `paymentInfo.status: 'completed'`, sets `paidAt`. |
| `checkout.session.expired` | same function | Releases the reserved stock and marks the order `paymentInfo.status: 'failed'` / `orderStatus: 'cancelled'`. Fires automatically ~24h after an abandoned checkout. |

**Security:** every webhook request's `Stripe-Signature` header is verified against
`WEBHOOK_ENDPOINT_SECRET` before the payload is trusted (`Backend/modules/orders/order.webhook.js`).
Requests with a missing/invalid signature are rejected with 400 before any DB write.

**Idempotency:** each Stripe event id is claimed in Redis (`markEventProcessed`,
`Backend/shared/utils/idempotency.js`) before it's processed, so a Stripe retry of an
already-handled event is a no-op 200 instead of double-crediting or double-cancelling an order.

**Local testing:**

```bash
stripe listen --forward-to localhost:8001/api/v1/webhook
# copy the printed whsec_... into Backend/.env as WEBHOOK_ENDPOINT_SECRET, restart the server
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
```

(Adjust the port in the `stripe listen` command if `Backend/.env`'s `PORT` differs from 8001.)

### 💻 Frontend Setup

1. Install Dependencies:
   ```bash
   cd CartLoop/frontend
   npm install
2. Setup Environment Varibles:
   Create .env in Backend Directory paste given below
   ```bash
    VITE_API_URL=
   ```
3. Run the Frontend:
   ```bash
   npm run dev
   ```

### 🚀 Landing Page

<img width="2576" height="auto" alt="cartloop vercel app_ (1)" src="https://github.com/user-attachments/assets/07f38aa7-e15f-406d-9458-952cebc1d0ee" />


---

### 🛒 Product Section

<img width="100%" alt="Screenshot 2025-07-22 133656" src="https://github.com/user-attachments/assets/1b06c1f3-8fef-45ae-b14e-513b3a3a6b71" />
<img width="1920" height="1200" alt="Screenshot 2025-07-22 154935" src="https://github.com/user-attachments/assets/4d40a96c-00c0-4a38-8d6b-648ae3e32fba" />
<img width="1920" height="1200" alt="Screenshot 2025-07-22 154947" src="https://github.com/user-attachments/assets/1eee4a64-eb61-46fc-a7a4-7c961af7edd2" />
<img width="100%" alt="Screenshot 2025-07-22 134314" src="https://github.com/user-attachments/assets/ddf49ad2-77f0-417a-80a0-0bfe4f2c0809" />
<img width="100%" alt="Screenshot 2025-07-22 134323" src="https://github.com/user-attachments/assets/b9b56d91-9839-4a7e-9ead-3ddb71d8014c" />

---

### 👤 User Profile

<img width="100%" alt="Screenshot 2025-07-22 133710" src="https://github.com/user-attachments/assets/ad34011a-caaf-4d3b-96c8-37dd8cc355c4" />

---

### 📊 Vendor Dashboard

<img width="100%" alt="Screenshot 2025-07-22 134331" src="https://github.com/user-attachments/assets/6544149f-361c-40b2-a819-8a063800c7f0" />
<img width="100%" alt="Screenshot 2025-07-22 134341" src="https://github.com/user-attachments/assets/6ea61955-1b45-46b6-b0e5-df1814b8be8d" />
<img width="100%" alt="Screenshot 2025-07-22 134526" src="https://github.com/user-attachments/assets/e092c597-6781-4030-abff-8764b47307c8" />

---

### 🗄️ Database Structure
<img width="1246" height="1036" alt="Screenshot 2025-07-12 150658" src="https://github.com/user-attachments/assets/07af0be2-cf18-4f17-a01a-161cb04955a6" />


---

### 🗄️ System Architecture
<img width="1919" height="700" alt="Screenshot 2025-07-22 150153" src="https://github.com/user-attachments/assets/f1412ced-40e0-45b7-9204-697cbdea79f1" />


## 📦 Future Improvements
 
- 🛠️ Docker support for containerization  
- 🧪 Unit & integration tests (Jest + Supertest)  
- 📡 WebSockets for real-time order updates  

---

## 🤝 Contributing

We welcome contributions! Feel free to:

- Fork this repo  
- Create a branch  
- Submit a Pull Request  

---

## 📝 License

Licensed under the [MIT License](LICENSE).

---

## 📧 Contact

For support or collaboration:

- ✉️ Email: karansalviwork@gmail.com  
- 🌐 Portfolio: [KaranSalvi.com](https://karansalvi.vercel.app/)  
- 📦 GitHub: [KaranSalvi](https://github.com/Karan-Salvi)  


