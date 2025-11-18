const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOrderSMS = async (toPhone, order) => {
  // Format phone number if needed (ensure it starts with +country code)
  const formattedPhone = toPhone.startsWith("+") ? toPhone : `+91${toPhone}`;

  await client.messages.create({
    body: `✓ Order Confirmed!\nOrder ID: ${order._id}\nTotal: ₹${order.totalPrice}\nYou'll receive updates soon. Thank you for shopping with K Store!`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: formattedPhone,
  });
};

module.exports = { sendOrderSMS };
