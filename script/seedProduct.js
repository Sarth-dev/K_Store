// Load .env FIRST, before anything else
require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
const Product = require("../models/Product");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    console.log("🔍 Checking MongoDB URI...");
    console.log("MONGODB_URI:", mongoURI ? "✅ Loaded" : "❌ UNDEFINED");
    if (!mongoURI) {
      console.error("❌ .env file not found or MONGODB_URI is missing!");
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    console.log("📡 Connecting to MongoDB...");
    const conn = await mongoose.connect(mongoURI, {});
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    // ------------- PRODUCT DATA -----------------
  const products = [
  {
    name: "Wireless Headphones Pro",
    brand: "SoundMax",
    description: "High-quality sound with active noise cancellation, 30-hour battery life, and comfortable fit",
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Comfort Fit Ear Cushions",
      "Bluetooth 5.0 Connectivity",
    ],
    price: 2999,
    originalPrice: 3999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1935",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688",
    ],
    countInStock: 50,
    rating: 4.5,
    numReviews: 127,
    countryOfOrigin: "China",
    hsnCode: "8518",
    manufacturer: "SoundMax Electronics Ltd, Shenzhen, China",
    warranty: "1 Year Manufacturer Warranty",
    dimensions: "7 x 6 x 3 cm",
    weight: "250g",
    sku: "SMX-HP-001",
    barcode: "8901234567890",
  },
  {
    name: "Smart Watch Ultra",
    brand: "TimeTech",
    description: "Track your fitness goals with advanced health monitoring and GPS tracking",
    features: [
      "Heart Rate Monitoring",
      "GPS Tracking",
      "Water Resistant up to 50 meters",
      "Sleep Analysis",
    ],
    price: 4999,
    originalPrice: 5999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=764",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=764",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=764",
    ],
    countInStock: 35,
    rating: 4.3,
    numReviews: 89,
    countryOfOrigin: "China",
    hsnCode: "9102",
    manufacturer: "TimeTech Watches Inc, Beijing, China",
    warranty: "6 Months Manufacturer Warranty",
    dimensions: "4.5 x 3.8 x 1.2 cm",
    weight: "150g",
    sku: "TT-WT-035",
    barcode: "8909876543210",
  },
  {
    name: "Running Shoes Comfort",
    brand: "StridePro",
    description: "Comfortable and durable with cushioned sole for long-distance running",
    features: [
      "Cushioned Sole",
      "Breathable Mesh Upper",
      "Durable Rubber Outsole",
      "Available in multiple sizes",
    ],
    price: 3499,
    originalPrice: 4499,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=764",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=764",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=764",
    ],
    countInStock: 45,
    rating: 4.6,
    numReviews: 203,
    countryOfOrigin: "India",
    hsnCode: "6403",
    manufacturer: "StridePro Footwear Pvt Ltd, Mumbai, India",
    warranty: "3 Months Manufacturer Warranty",
    dimensions: "30 x 10 x 10 cm",
    weight: "850g",
    sku: "SP-RS-101",
    barcode: "8906543210987",
  },
  {
    name: "Premium Laptop Bag",
    brand: "CarryMate",
    description: "Stylish and spacious bag with multiple compartments for laptops up to 15 inches",
    features: [
      "Multiple Compartments",
      "Padded Laptop Sleeve",
      "Water-resistant Fabric",
      "Adjustable Shoulder Strap",
    ],
    price: 1299,
    originalPrice: 1799,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1611461527944-1a718332613b?q=80&w=688",
      "https://images.unsplash.com/photo-1611461527944-1a718332613b?q=80&w=688",
      "https://images.unsplash.com/photo-1611461527944-1a718332613b?q=80&w=688",
    ],
    countInStock: 60,
    rating: 4.4,
    numReviews: 156,
    countryOfOrigin: "India",
    hsnCode: "4202",
    manufacturer: "CarryMate Bags, Delhi, India",
    warranty: "1 Year Warranty",
    dimensions: "40 x 30 x 12 cm",
    weight: "1.2kg",
    sku: "CM-LB-015",
    barcode: "8903210987654",
  },
  {
    name: "Coffee Maker Deluxe",
    brand: "BrewMaster",
    description: "Brew perfect coffee every time with programmable settings and thermal carafe",
    features: [
      "Programmable Timer",
      "Thermal Carafe",
      "Auto Shut-Off",
      "Easy to Clean",
    ],
    price: 2499,
    originalPrice: 2999,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1608354580875-30bd4168b351?q=80&w=687",
    ],
    countInStock: 25,
    rating: 4.7,
    numReviews: 312,
    countryOfOrigin: "Germany",
    hsnCode: "8516",
    manufacturer: "BrewMaster Appliances, Berlin, Germany",
    warranty: "2 Year Warranty",
    dimensions: "25 x 20 x 30 cm",
    weight: "3.5kg",
    sku: "BM-CM-002",
    barcode: "8907778889996",
  },
  {
    name: "Yoga Mat Premium",
    brand: "FlexFit",
    description: "Non-slip surface for better grip with eco-friendly materials and carrying strap",
    features: [
      "Non-slip Surface",
      "Eco-friendly Material",
      "Lightweight & Portable",
      "Includes Carry Strap",
    ],
    price: 899,
    originalPrice: 1200,
    category: "fitness",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=880",
    ],
    countInStock: 80,
    rating: 4.5,
    numReviews: 145,
    countryOfOrigin: "India",
    hsnCode: "9506",
    manufacturer: "FlexFit Gear, Bangalore, India",
    warranty: "6 Months Warranty",
    dimensions: "183 x 61 x 0.5 cm",
    weight: "2kg",
    sku: "FF-YM-010",
    barcode: "8906541239876",
  },
];


    // Transform products: use "images" as array and assign main "image" field
    const transformedProducts = products.map((product) => {
      if (Array.isArray(product.images) && product.images.length > 0) {
        return {
          ...product,
          image: product.images[0], // Assign 1st image as main cover image
        };
      } else if (product.image) {
        return {
          ...product,
          images: [product.image], // If single image, put it in images array too
        };
      }
      return product;
    });

    console.log("🗑️  Clearing existing products...");
    await Product.deleteMany({});

    console.log("📝 Adding new products...");
    const createdProducts = await Product.insertMany(transformedProducts);
    console.log(`✅ ${createdProducts.length} products added to database successfully!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
