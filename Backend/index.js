import express from "express";
import dotenv from "dotenv";
import logger from "./infra/logger/logger.js";
// middlewares
import rateLimit from "./shared/middlewares/rateLimiter.js";
import cookieParser from "cookie-parser";
// Database connection
import DB_connect from "./database/DB_connect.js";
// cloudinary
import cloudinary from "cloudinary";
// cors
import cors from "cors";
// routes
import productRoute from "./modules/products/product.routes.js";
import userRoute from "./modules/users/user.routes.js";
import orderRoute from "./modules/orders/order.routes.js";

// dotenv configuration
dotenv.config({
  path: "./.env",
});

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Database connection

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// rate limiting
app.use(rateLimit);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is ready to listen");
});

// routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

const startServer = async () => {
  try {
    await DB_connect();

    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
