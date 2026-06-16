const bcrypt = require("bcrypt");

const User = require("../models/User");

const ApiError = require("../utils/ApiError");

const HTTP_STATUS = require("../constants/httpStatus");

const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return user;
};
 
const updateProfileService = async (userId, updateData) => {
  const allowedFields = ["name"];

  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredData[key] = updateData[key];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const changePasswordService = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Old password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();
};

const deleteAccountService = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  return deletedUser;
};

module.exports = {
  getProfileService,
  updateProfileService,
  changePasswordService,
  deleteAccountService,
};
