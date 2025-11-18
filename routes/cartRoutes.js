const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controller/cartController");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getCart).post(protect, addToCart);
router.route("/item").put(protect, updateCartItem).delete(protect, removeFromCart);
router.route("/clear").post(protect, clearCart);

module.exports = router;
