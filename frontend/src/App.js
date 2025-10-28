import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  // ✅ Fetch products
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // ✅ Fetch cart
  const getCart = () => {
    fetch(`${API_BASE}/cart`)
      .then((res) => res.json())
      .then((data) => setCart(data.items || []))
      .catch((err) => console.error("Error loading cart:", err));
  };

  useEffect(() => {
    getCart();
  }, []);

  // ✅ Add to Cart
  const addToCart = async (productId) => {
    await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty: 1 }),
    });
    getCart();
  };

  // ✅ Remove from Cart
  const removeFromCart = async (id) => {
    await fetch(`${API_BASE}/cart/${id}`, { method: "DELETE" });
    getCart();
  };

  // ✅ Checkout
  const handleCheckout = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields before checkout.");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (letters only).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cart,
          customerName: name,
          customerEmail: email,
        }),
      });

      const data = await res.json();

      if (data && data.total) {
        setReceipt(data);
        setCart([]);
        setName("");
        setEmail("");
      } else {
        alert("Checkout failed. Try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🛍️ Vibe Commerce</h1>

      {/* ✅ Products Section */}
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p className="desc">{product.description}</p>
            <p><b>₹{product.price}</b></p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* ✅ Cart Section */}
      <div className="cart-container">
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>Qty: {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>

      {/* ✅ Checkout Section */}
      <div className="checkout-form">
        <h2>Checkout</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>

      {/* ✅ Receipt Modal */}
      {receipt && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <h2>🎉 Thank You, {receipt.customer}!</h2>
            <p>Your order is confirmed.</p>
            <p><b>Email:</b> {receipt.email}</p>
            <p><b>Total:</b> ₹{receipt.total}</p>
            <p>
              <b>Date:</b>{" "}
              {new Date(receipt.timestamp).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <button onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
