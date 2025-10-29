import express from "express";
const router = express.Router();

let cart = []; // temporary in-memory cart

// Add to cart
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) return res.status(400).json({ message: "Product ID required" });

  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.qty += qty || 1;
  else cart.push({ productId, qty: qty || 1 });

  res.json({ cart });
});

// Get cart
router.get("/", (req, res) => {
  res.json({ cart });
});

// Remove item
router.delete("/:id", (req, res) => {
  cart = cart.filter((item) => item.productId !== req.params.id);
  res.json({ cart });
});

export default router;
