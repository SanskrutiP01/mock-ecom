const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mockEcom")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// ✅ Seed Products (only if empty)
async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "Wireless Headphones", price: 1999, description: "Comfortable over-ear headphones with noise cancellation." },
      { name: "Smart Watch", price: 2499, description: "Track fitness, sleep, and notifications with ease." },
      { name: "Bluetooth Speaker", price: 1599, description: "Portable speaker with deep bass and long battery life." },
      { name: "USB-C Charger", price: 499, description: "Fast charging adapter compatible with all Type-C devices." },
      { name: "Gaming Mouse", price: 999, description: "High-precision gaming mouse with RGB lighting." },
      { name: "Laptop Stand", price: 1099, description: "Ergonomic aluminum stand for better posture." },
      { name: "Wireless Keyboard", price: 1199, description: "Slim Bluetooth keyboard for laptop or tablet use." },
      { name: "Webcam", price: 1899, description: "Full HD webcam with built-in microphone." },
    ]);
    console.log("🌱 Sample products seeded!");
  }
}
seedProducts();

// ✅ In-memory Cart
let cart = [];

// ✅ Get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Get cart
app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

// ✅ Add to cart
app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.qty += qty || 1;
  } else {
    cart.push({
      productId,
      name: product.name,
      price: product.price,
      qty: qty || 1,
    });
  }

  res.json({ message: "Item added to cart", items: cart });
});

// ✅ Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  cart = cart.filter((item) => item.productId !== req.params.id);
  res.json({ message: "Item removed", items: cart });
});

// ✅ Checkout
app.post("/api/checkout", (req, res) => {
  const { customerName, customerEmail, cartItems } = req.body;

  if (!customerName || !customerEmail)
    return res.status(400).json({ message: "Invalid name or email" });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    customer: customerName,
    email: customerEmail,
    total,
    timestamp: new Date().toISOString(),
  };

  cart = []; // clear cart
  res.json(receipt);
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
