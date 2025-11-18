const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: "User" 
    },
    orderItems: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product",
          required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 }, // Changed from qty to quantity
        image: String,
      },
    ],
    shippingAddress: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String, // Add phone number for SMS notifications
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: String,
      country: String,
    },
    paymentMethod: { 
      type: String, 
      required: true,
      enum: ["card", "upi", "cod"] // Restrict to valid payment methods
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, default: 0.0 }, // Subtotal before tax/shipping
    taxPrice: { type: Number, default: 0.0 },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    orderStatus: { 
      type: String, 
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
