const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRE,
  });
};
 
module.exports = generateAccessToken;
