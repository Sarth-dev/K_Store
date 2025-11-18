const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrders,
  getOrderById,
} = require("../controller/orderController");
const { protect } = require("../middleware/auth");

router.route("/").post(protect, addOrder).get(protect, getOrders);
router.route("/:id").get(protect, getOrderById);

module.exports = router;
