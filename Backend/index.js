const express = require("express");
const dotenv = require("dotenv");
const logger = require("./infra/logger/logger.js");
// middlewares
const rateLimit = require("./shared/middlewares/rateLimiter.js");
const {
  checkAuthenticated,
} = require("./shared/middlewares/authentication.js");
const cookieParser = require("cookie-parser");
// Database connection
const DB_connect = require("./database/DB_connect.js");
// cloudinary
const cloudinary = require("cloudinary").v2;
// cors
const cors = require("cors");
// routes
const productRoute = require("./modules/products/product.routes.js");
const userRoute = require("./modules/users/user.routes.js");
const orderRoute = require("./modules/orders/order.routes.js");

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
DB_connect();

// middelwares
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

app.listen(PORT, () => {
  logger.info("Server started on port " + 3000);
});
