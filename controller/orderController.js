const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { sendOrderEmail } = require("../utils/mailer");
const { sendOrderSMS } = require("../utils/smsSender");

// Create new order
const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  try {
    // Create order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: paymentMethod === "cod" ? false : true, // COD not pre-paid
      paidAt: paymentMethod === "cod" ? null : new Date(),
      isDelivered: false,
      orderStatus: "pending",
    });

    const createdOrder = await order.save();

    // Clear user's cart
    await Cart.deleteOne({ user: req.user._id });

    // Send notifications asynchronously (don't wait for them)
    if (req.user.email) {
      sendOrderEmail(req.user.email, {
        _id: createdOrder._id,
        totalPrice: createdOrder.totalPrice,
        orderItems: createdOrder.orderItems,
        shippingAddress: createdOrder.shippingAddress,
      }).catch((err) => console.error("Email error:", err));
    }

    if (shippingAddress.phone) {
      sendOrderSMS(shippingAddress.phone, {
        _id: createdOrder._id,
        totalPrice: createdOrder.totalPrice,
      }).catch((err) => console.error("SMS error:", err));
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Get user's orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product", "name price image")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product",
    "name price image"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { addOrder, getOrders, getOrderById };
