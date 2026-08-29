import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import logger from './infra/logger/logger.js';
import { openapiSpec } from './openapi.js';
// middlewares
import rateLimit from './shared/middlewares/rateLimiter.js';
// routes
import productRoute from './modules/products/product.routes.js';
import userRoute from './modules/users/user.routes.js';
import orderRoute from './modules/orders/order.routes.js';
import vendorRoute from './modules/vendor/vendor.routes.js';
import recommendationRoute from './modules/recommendations/recommendation.routes.js';

import dbConnect from '#database/dbConnect.js';

// dotenv configuration
dotenv.config({
  path: './.env',
});

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: '16kb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// rate limiting
app.use(rateLimit);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server is ready to listen');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', vendorRoute);
app.use('/api/v1', recommendationRoute);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `${field} already in use`,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(', '),
    });
  }

  if (err.name === 'MulterError' || /image/i.test(err.message || '')) {
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' ? 'Image file too large (max 5MB)' : err.message,
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.expose ? err.message : 'Internal server error',
  });
});

const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
