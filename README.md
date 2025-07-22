# 🛒 CartLoop - Modern E-Commerce Platform

CartLoop is a high-performance, scalable, and secure e-commerce web application built with a modern tech stack. It features robust user authentication, advanced rate limiting, efficient caching using Redis, and primary data persistence with MongoDB. The frontend is designed using React, Tailwind CSS, and Redux Toolkit Query for an optimized developer and user experience.

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

<img width="100%" alt="Screenshot 2025-07-22 133500" src="https://github.com/user-attachments/assets/74d9f069-cd37-4005-923f-66e681b564b4" />
<img width="100%" alt="Screenshot 2025-07-22 133524" src="https://github.com/user-attachments/assets/3021c9dc-30fe-4564-9ad5-0a9d8b40b67a" />
<img width="100%" alt="Screenshot 2025-07-22 133537" src="https://github.com/user-attachments/assets/a55bfb54-c216-43d3-9878-06c07d403ee6" />
<img width="100%" alt="Screenshot 2025-07-22 133556" src="https://github.com/user-attachments/assets/0d315ad9-79b1-4ea8-9791-f991efd5a5ff" />
<img width="100%" alt="Screenshot 2025-07-22 133617" src="https://github.com/user-attachments/assets/021ebd51-44c1-4b81-b764-ae0df11a0455" />
<img width="100%" alt="Screenshot 2025-07-22 133628" src="https://github.com/user-attachments/assets/2946fe2c-93a1-4456-acc8-dcd4a197df87" />

---

### 🛒 Product Section

<img width="100%" alt="Screenshot 2025-07-22 133656" src="https://github.com/user-attachments/assets/1b06c1f3-8fef-45ae-b14e-513b3a3a6b71" />
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
- 📦 GitHub: [KaranSalvi](https://github.com/Karan-Salvie)  


