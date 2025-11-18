const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate input
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if user exists
  const userExists = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { phone }],
  });

  if (userExists) {
    res.status(400);
    throw new Error("User with this email or phone already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });

  // Check password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, loginUser };
