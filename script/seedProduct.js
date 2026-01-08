// Load .env FIRST, before anything else
require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");
const Product = require("../models/Product");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://kalemsarthak123_db_user:QtPj0oGsQ7GETNFG@kstorecluster1.yedm1jc.mongodb.net/kstore?retryWrites=true&w=majority";
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
  {
  name: "Bluetooth Speaker Mini",
  brand: "BeatBox",
  description: "Compact speaker with deep bass and long battery life",
  features: ["Deep Bass", "10-hour Playtime", "Portable Design", "Bluetooth 5.1"],
  price: 1999,
  originalPrice: 2499,
  category: "electronics",
  images: ["https://images.unsplash.com/photo-1585386959984-a4155224a1ad"],
  countInStock: 40,
  rating: 4.4,
  numReviews: 98,
  countryOfOrigin: "China",
  hsnCode: "8518",
  manufacturer: "BeatBox Audio, Shenzhen",
  warranty: "1 Year Warranty",
  dimensions: "18 x 7 x 7 cm",
  weight: "600g",
  sku: "BB-SP-009",
  barcode: "8901112233445",
},
{
  name: "USB-C Fast Charger 65W",
  brand: "ChargePro",
  description: "Fast charging adapter for laptops and smartphones",
  features: ["65W Output", "PD Support", "Compact Size"],
  price: 1799,
  originalPrice: 2299,
  category: "electronics",
  images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6"],
  countInStock: 70,
  rating: 4.6,
  numReviews: 212,
  countryOfOrigin: "China",
  hsnCode: "8504",
  manufacturer: "ChargePro Tech",
  warranty: "1 Year Warranty",
  dimensions: "6 x 6 x 3 cm",
  weight: "180g",
  sku: "CP-CH-065",
  barcode: "8902223344556",
},
{
  name: "Wireless Mouse Ergonomic",
  brand: "ClickEase",
  description: "Ergonomic wireless mouse for daily productivity",
  features: ["Silent Clicks", "Ergonomic Design", "2.4GHz Wireless"],
  price: 899,
  originalPrice: 1299,
  category: "electronics",
  images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
  countInStock: 90,
  rating: 4.3,
  numReviews: 164,
  countryOfOrigin: "China",
  hsnCode: "8471",
  manufacturer: "ClickEase Electronics",
  warranty: "6 Months Warranty",
  dimensions: "11 x 6 x 4 cm",
  weight: "120g",
  sku: "CE-MS-022",
  barcode: "8903334455667",
},
{
  name: "Noise Cancelling Earbuds",
  brand: "SoundMax",
  description: "True wireless earbuds with ENC and fast charging",
  features: ["ENC", "Fast Charging", "Touch Controls"],
  price: 2599,
  originalPrice: 3299,
  category: "electronics",
  images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df"],
  countInStock: 55,
  rating: 4.5,
  numReviews: 141,
  countryOfOrigin: "China",
  hsnCode: "8518",
  manufacturer: "SoundMax Electronics",
  warranty: "1 Year Warranty",
  dimensions: "5 x 4 x 3 cm",
  weight: "90g",
  sku: "SM-EAR-007",
  barcode: "8904445566778",
},
{
  name: "Men's Casual T-Shirt",
  brand: "UrbanWear",
  description: "Soft cotton t-shirt for everyday comfort",
  features: ["100% Cotton", "Regular Fit", "Breathable Fabric"],
  price: 699,
  originalPrice: 999,
  category: "fashion",
  images: ["https://images.unsplash.com/photo-1520975916090-3105956dac38"],
  countInStock: 100,
  rating: 4.2,
  numReviews: 178,
  countryOfOrigin: "India",
  hsnCode: "6109",
  manufacturer: "UrbanWear India",
  warranty: "No Warranty",
  dimensions: "30 x 25 x 2 cm",
  weight: "250g",
  sku: "UW-TS-001",
  barcode: "8905556677889",
},
{
  name: "Women's Denim Jacket",
  brand: "StyleEdge",
  description: "Trendy denim jacket for casual wear",
  features: ["Premium Denim", "Slim Fit", "Durable Stitching"],
  price: 2499,
  originalPrice: 3299,
  category: "fashion",
  images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
  countInStock: 35,
  rating: 4.6,
  numReviews: 94,
  countryOfOrigin: "India",
  hsnCode: "6202",
  manufacturer: "StyleEdge Apparel",
  warranty: "No Warranty",
  dimensions: "35 x 30 x 5 cm",
  weight: "700g",
  sku: "SE-DJ-008",
  barcode: "8906667788990",
},
{
  name: "Sports Cap Adjustable",
  brand: "FitStyle",
  description: "Lightweight cap for sports and outdoor use",
  features: ["Adjustable Strap", "Breathable Fabric"],
  price: 399,
  originalPrice: 699,
  category: "fashion",
  images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10"],
  countInStock: 120,
  rating: 4.3,
  numReviews: 210,
  countryOfOrigin: "India",
  hsnCode: "6505",
  manufacturer: "FitStyle India",
  warranty: "No Warranty",
  dimensions: "20 x 20 x 12 cm",
  weight: "120g",
  sku: "FS-CAP-004",
  barcode: "8907778899001",
},
{
  name: "Formal Leather Belt",
  brand: "ClassicWear",
  description: "Genuine leather belt for formal occasions",
  features: ["Genuine Leather", "Metal Buckle"],
  price: 999,
  originalPrice: 1499,
  category: "fashion",
  images: ["https://images.unsplash.com/photo-1585386959984-a4155224a1ad"],
  countInStock: 60,
  rating: 4.5,
  numReviews: 88,
  countryOfOrigin: "India",
  hsnCode: "4203",
  manufacturer: "ClassicWear India",
  warranty: "6 Months Warranty",
  dimensions: "110 x 4 x 1 cm",
  weight: "300g",
  sku: "CW-BELT-021",
  barcode: "8908889900112",
},
{
  name: "Electric Kettle 1.5L",
  brand: "HomeEase",
  description: "Fast boiling kettle with auto shut-off",
  features: ["Auto Shut-Off", "Stainless Steel", "1.5L Capacity"],
  price: 1699,
  originalPrice: 2199,
  category: "home",
  images: ["https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3"],
  countInStock: 40,
  rating: 4.4,
  numReviews: 130,
  countryOfOrigin: "India",
  hsnCode: "8516",
  manufacturer: "HomeEase Appliances",
  warranty: "1 Year Warranty",
  dimensions: "22 x 15 x 18 cm",
  weight: "1.1kg",
  sku: "HE-KET-012",
  barcode: "8909990011223",
},
{
  name: "Phone Stand Adjustable",
  brand: "DeskMate",
  description: "Adjustable phone stand for desk use",
  features: ["Adjustable Angle", "Anti-Slip Base"],
  price: 499,
  originalPrice: 799,
  category: "accessories",
  images: ["https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"],
  countInStock: 150,
  rating: 4.4,
  numReviews: 267,
  countryOfOrigin: "India",
  hsnCode: "3926",
  manufacturer: "DeskMate India",
  warranty: "No Warranty",
  dimensions: "10 x 8 x 6 cm",
  weight: "200g",
  sku: "DM-PS-010",
  barcode: "8902222333444",
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
