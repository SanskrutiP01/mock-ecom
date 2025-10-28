const API_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const getCart = async () => {
  const res = await fetch(`${API_URL}/cart`);
  return res.json();
};

export const addToCart = async (productId, qty = 1) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  });
  return res.json();
};

export const removeFromCart = async (id) => {
  const res = await fetch(`${API_URL}/cart/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const checkout = async (cartItems) => {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems }),
  });
  return res.json();
};
