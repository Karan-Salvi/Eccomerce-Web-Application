import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createLogger, format, transports } from 'winston';

/**
 * Recreate __filename and __dirname for ES Modules
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Logs directory: Backend/logs
 */
const logDir = path.join(__dirname, '..', '..', 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Winston Logger Configuration
 */
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),

    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

/**
 * Console logging for non-production environments
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp, stack }) => {
          return `[${timestamp}] ${level}: ${stack || message}`;
        })
      ),
    })
  );
}

export default logger;
