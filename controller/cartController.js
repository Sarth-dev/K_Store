const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart for user
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart) {
    return res.json({ items: [], totalPrice: 0 });
  }

  res.json(cart);
});

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error("Product ID and quantity are required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create new cart
    cart = await Cart.create({
      user: req.user._id,
      items: [
        {
          product: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ],
    });
  } else {
    // Check if product already in cart
    const existingItem = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItem > -1) {
      // Update quantity
      cart.items[existingItem].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }
  }

  // Calculate total price
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
});

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }

  // Recalculate total
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  // Recalculate total
  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  await cart.save();
  res.json(cart);
});

// Clear cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.json({ message: "Cart cleared", cart });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
