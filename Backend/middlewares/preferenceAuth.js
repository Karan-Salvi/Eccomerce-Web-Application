const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const logger = require("../utils/logger");
function preferenceAuth() {
  return async (req, res, next) => {
    const tokenValue = req.cookies[process.env.TOKEN_NAME];

    console.log("Preference token is : ", tokenValue);

    if (!tokenValue) {
      logger.error("Token not found");
      next();
    }
    try {
      const payload = await jwt.verify(
        tokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        logger.error("Payload not found");

        next();
      }

      req.user = payload;

      return next();
    } catch (error) {
      logger.error("Something went wrong while authentication : ", error);
      next();
    }
  };
}

module.exports = preferenceAuth;
