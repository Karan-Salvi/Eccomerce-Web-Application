const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");

// ─────────────────────────────────────────────
// 🗂️ Ensure logs directory exists
// ─────────────────────────────────────────────
const logDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// ─────────────────────────────────────────────
// 🛠️ Winston Logger Configuration
// ─────────────────────────────────────────────
const logger = createLogger({
  level: "info", // Default level (can override via env)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // ⏱ Timestamp
    format.errors({ stack: true }), // 🐞 Include stack trace
    format.splat(), // 🎯 Support %s-style formatting
    format.json() // 🧾 JSON output for structured logging
  ),
  transports: [
    // 📁 Error logs
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      handleExceptions: true,
    }),

    // 📁 Combined logs (all levels)
    new transports.File({
      filename: path.join(logDir, "combined.log"),
      handleExceptions: true,
    }),
  ],
  exitOnError: false, // Prevent crashing on handled exceptions
});

// ─────────────────────────────────────────────
// 🖥️ Console Logging in Development
// ─────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(), // 🎨 Colorize levels (info, error, etc.)
        format.printf(({ level, message, timestamp, stack }) => {
          return `[${timestamp}] ${level}: ${stack || message}`;
        })
      ),
    })
  );
}

module.exports = logger;
