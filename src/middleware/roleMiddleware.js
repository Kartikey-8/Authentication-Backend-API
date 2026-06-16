const ApiError = require("../utils/ApiError");

const HTTP_STATUS = require("../constants/httpStatus");

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "Access denied"
      );
    }

    next();
  };
};

module.exports = roleMiddleware;