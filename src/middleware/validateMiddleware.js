const HTTP_STATUS = require("../constants/httpStatus");

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }

    req.body = result.data;

    next();
  };
};

module.exports = validateMiddleware;
