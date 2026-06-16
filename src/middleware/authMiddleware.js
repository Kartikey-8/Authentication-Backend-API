const jwt = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");

const HTTP_STATUS = require("../constants/httpStatus");

const env = require("../config/env");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Access token missing"
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    env.JWT_ACCESS_SECRET
  );

  req.user = decoded;

  next();
};

module.exports = authMiddleware;