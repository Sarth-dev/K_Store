const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },               // Product title/name
    brand: { type: String, required: true },              // Brand/manufacturer name
    category: { type: String, required: true },           // Product category/sub-category
    description: { type: String, required: true },        // Detailed product description
    features: [{ type: String }],                          // Product key features/bullet points
    price: { type: Number, required: true },              // Selling price
    originalPrice: { type: Number },                       // MRP or original price (optional but recommended)
    image: { type: String, required: true },              // Main cover image
    images: [{ type: String, required: true }],           // Gallery of images (array)
    countInStock: { type: Number, default: 0 },           // Available stock quantity
    rating: { type: Number, default: 0 },                 // Average rating (calculated)
    numReviews: { type: Number, default: 0 },             // Number of customer reviews
    countryOfOrigin: { type: String, required: true },    // Country of origin for legal compliance
    hsnCode: { type: String },                             // HSN / tax code for India (optional)
    manufacturer: { type: String },                        // Manufacturer name & address (optional)
    warranty: { type: String },                            // Warranty info e.g. 1 year (optional)
    dimensions: { type: String },                          // Physical dimensions (optional)
    weight: { type: String },                              // Weight info (optional)
    sku: { type: String },                                 // Stock keeping unit (optional)
    barcode: { type: String },                             // UPC/EAN or other barcodes (optional)
    reviews: [reviewSchema], // Array of reviews
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
