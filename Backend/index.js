const express = require("express");
const productRoute = require("./routes/product.routes.js");
const userRoute = require("./routes/user.routes.js");
const orderRoute = require("./routes/order.routes.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DB_connect = require("./Database/DB_connect.js");
const { checkAuthenticated } = require("./middlewares/authentication.js");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
//const errorMiddleware = require("./middlewares/error.js");

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is ready to listen");
});

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
