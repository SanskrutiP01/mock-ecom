const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Mock Data (No image links)
let products = [
  { id: 1, name: "Wireless Headphones", price: 1999, description: "Comfortable over-ear headphones with noise cancellation." },
  { id: 2, name: "Smart Watch", price: 2499, description: "Track fitness, sleep, and notifications with ease." },
  { id: 3, name: "Bluetooth Speaker", price: 1599, description: "Portable speaker with deep bass and long battery life." },
  { id: 4, name: "USB-C Charger", price: 499, description: "Fast charging adapter compatible with all Type-C devices." },
  { id: 5, name: "Gaming Mouse", price: 999, description: "High-precision gaming mouse with RGB lighting." },
  { id: 6, name: "Laptop Stand", price: 1099, description: "Ergonomic aluminum stand for better posture." },
  { id: 7, name: "Wireless Keyboard", price: 1199, description: "Slim Bluetooth keyboard for laptop or tablet use." },
  { id: 8, name: "Webcam", price: 1899, description: "Full HD webcam with built-in microphone." }
];

let cart = [];

// ✅ GET /api/products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ GET /api/cart
app.get("/api/cart", (req, res) => {
  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId || p.id === item.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: item.qty,
    };
  });

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items, total });
});

// ✅ POST /api/cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === Number(productId));

  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find((item) => item.productId === Number(productId));
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId: Number(productId), qty });
  }

  res.json({ message: "Added to cart successfully", cart });
});

// ✅ DELETE /api/cart/:id
app.delete("/api/cart/:id", (req, res) => {
  const productId = Number(req.params.id);
  const index = cart.findIndex(
    (item) => item.productId === productId || item.id === productId
  );

  if (index === -1) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  cart.splice(index, 1);
  res.json({ message: "Item removed successfully", cart });
});

// ✅ POST /api/checkout
app.post("/api/checkout", (req, res) => {
  const { cartItems, customerName, customerEmail } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Fix: Support both id and productId
  const total = cartItems.reduce((sum, item) => {
    const product = products.find(
      (p) => p.id === item.productId || p.id === item.id
    );
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const receipt = {
    customer: customerName,
    email: customerEmail,
    total,
    timestamp: new Date().toISOString(),
  };

  // Clear cart after checkout
  cart = [];
  res.json(receipt);
});


// ✅ Start Server
app.listen(port, () =>
  console.log(`✅ Server running on http://localhost:${port}`)
);
