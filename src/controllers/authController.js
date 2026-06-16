const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

const {
  signupService,
  loginService,
  refreshAccessTokenService,
  logoutService,
} = require("../services/authService");

const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const signup = asyncHandler(async (req, res) => {
  const user = await signupService(req.body);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.CREATED,
    success: true,
    message: MESSAGES.USER_CREATED,
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.LOGIN_SUCCESS,
    data: {
      accessToken: data.accessToken,
      user: data.user,
    },
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = await refreshAccessTokenService(refreshToken);

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.TOKEN_REFRESHED,
    data: {
      accessToken,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  await logoutService(refreshToken);

  res.clearCookie("refreshToken");

  sendResponse({
    res,
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: MESSAGES.LOGOUT_SUCCESS,
  });
});

module.exports = {
  signup,
  login,
  refreshAccessToken,
  logout,
};
