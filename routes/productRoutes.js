const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { protect } = require("../middleware/auth");
const Product = require("../models/Product");
router.route("/").get(getProducts).post(protect, createProduct);
router.route("/:id").get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);


// POST /api/products/:id/reviews

router.post("/:id/reviews", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    if (!req.body.rating || !req.body.comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

    await product.save();
    const newReview = product.reviews[product.reviews.length - 1];
    res.status(201).json(newReview);

    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
