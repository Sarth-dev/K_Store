const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/auth");
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controller/userController");

// User routes (protected)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin routes (protected + admin check)
router.route("/").get(protect, isAdmin, getUsers);
router.route("/:id").get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser).delete(protect, isAdmin, deleteUser);

module.exports = router;
