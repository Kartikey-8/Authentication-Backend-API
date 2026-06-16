const express = require("express");

const {
  getMyProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMyProfile);

router.patch("/me", updateProfile);

router.patch("/change-password", changePassword);

router.delete("/me", deleteAccount);

module.exports = router;
