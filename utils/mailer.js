const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOrderEmail = async (toEmail, order) => {
  const message = {
    from: process.env.SMTP_USER,
    to: toEmail,
    subject: `Order Confirmation - K Store (Order #${order._id})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Thank You for Your Order!</h1>
        
        <p>Your order has been confirmed and will be processed soon.</p>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalPrice?.toLocaleString()}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #1e40af;">Shipping Address</h3>
          <p>
            ${order.shippingAddress?.firstName} ${order.shippingAddress?.lastName}<br/>
            ${order.shippingAddress?.address}<br/>
            ${order.shippingAddress?.city}, ${order.shippingAddress?.state} ${order.shippingAddress?.pincode}<br/>
            Phone: ${order.shippingAddress?.phone}
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #1e40af;">Items Ordered</h3>
          <ul>
            ${order.orderItems?.map((item) => `<li>${item.name} (Qty: ${item.quantity}) - ₹${item.price}</li>`).join("")}
          </ul>
        </div>
        
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          You will receive a tracking number via SMS soon. Thank you for shopping with K Store!
        </p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

module.exports = { sendOrderEmail };
