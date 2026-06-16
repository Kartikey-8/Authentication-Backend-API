const asyncHandler = require("../utils/asyncHandler");

const sendResponse = require("../utils/sendResponse");

const {
  getProfileService,
  updateProfileService,
  changePasswordService,
  deleteAccountService,
} = require("../services/userService");

const HTTP_STATUS = require("../constants/httpStatus");

const MESSAGES = require("../constants/messages");

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user.userId);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.PROFILE_FETCHED,
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateProfileService(req.user.userId, req.body);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.PROFILE_UPDATED,
    data: updatedUser,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  await changePasswordService(req.user.userId, oldPassword, newPassword);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.PASSWORD_CHANGED,
  });
});

const deleteAccount = asyncHandler(async (req, res) => {
  await deleteAccountService(req.user.userId);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.ACCOUNT_DELETED,
  });
});

module.exports = {
  getMyProfile,
  updateProfile,
  changePassword,
  deleteAccount,
};
