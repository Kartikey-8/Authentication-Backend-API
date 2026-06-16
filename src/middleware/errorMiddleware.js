const HTTP_STATUS = require("../constants/httpStatus");

const logger = require("../config/logger")

const errorMiddleware = (error, req, res, next) => {
  logger.error("Error occurred", {
    message: error.message,

    stack: error.stack,

    method: req.method,

    url: req.originalUrl,

    time: new Date().toISOString(),
  });
 
  if (process.env.NODE_ENV === "development") {
    return res
      .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        success: false,

        message: error.isOperational ? error.message : "Internal Server Error",

        stack: error.stack,
      });
  }

  if (process.env.NODE_ENV === "production") {
    return res
      .status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        success: false,

        message: error.isOperational ? error.message : "Internal Server Error",
      });
  }
};

module.exports = errorMiddleware;
