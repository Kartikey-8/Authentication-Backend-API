const jwt = require("jsonwebtoken");
const env = require("../config/env");
 
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRE,
  });
};
 
module.exports = generateRefreshToken;
