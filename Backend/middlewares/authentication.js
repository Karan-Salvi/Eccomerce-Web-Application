const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

function checkAuthenticated() {
  return async (req, res, next) => {
    const tokenValue = req.cookies[process.env.TOKEN_NAME];

    if (!tokenValue) {
      return res.status(400).json({
        success: false,
        message: "Bad request!!",
      });
    }
    try {
      const payload = await jwt.verify(
        tokenValue,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!payload) {
        return res.status(400).json({
          success: false,
          message: "Bad request!!",
        });
      }

      req.user = payload;

      return next();
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: "Something went wrong..",
      });
    }
  };
}

function authorizeRoles(...roles) {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "You are unauthorised to access this resource",
      });
      return next();
    }

    return next();
  };
}

module.exports = { checkAuthenticated, authorizeRoles };
