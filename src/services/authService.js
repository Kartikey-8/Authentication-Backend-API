const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const ApiError = require("../utils/ApiError");
const generateAccessToken = require("../utils/generateToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const HTTP_STATUS = require("../constants/httpStatus");

const env = require("../config/env");

const signupService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid credentials");
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  return newAccessToken;
};

const logoutService = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });
};

module.exports = {
  signupService,
  loginService,
  refreshAccessTokenService,
  logoutService,
};
