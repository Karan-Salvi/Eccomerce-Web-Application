const jwt = require("jsonwebtoken");
const User = require("../../modules/users/user.model.js");
const logger = require("../../infra/logger/logger.js");
function preferenceAuth() {
  return async (req, res, next) => {
    console.log("Product details called here");
    const tokenValue = req.cookies[process.env.TOKEN_NAME];

    console.log("Preference token is : ", tokenValue);

    if (!tokenValue) {
      logger.warn("Token not found");
      return next();
    }
    try {
      const payload = await jwt.verify(
        tokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        logger.error("Payload not found");

        return next();
      }

      req.user = payload;

      return next();
    } catch (error) {
      logger.error("Something went wrong while authentication : ", error);
      return next();
    }
  };
}

module.exports = preferenceAuth;
