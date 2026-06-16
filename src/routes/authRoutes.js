const express = require("express");

const authController = require("../controllers/authController");

const validateMiddleware = require("../middleware/validateMiddleware")

const { signupSchema, loginSchema } = require("../validators/authValidation");

const router = express.Router();

router.post("/signup", validateMiddleware(signupSchema), authController.signup);

router.post("/login", validateMiddleware(loginSchema), authController.login);

router.post("/refresh", authController.refreshAccessToken);

router.post("/logout", authController.logout);

module.exports = router;
