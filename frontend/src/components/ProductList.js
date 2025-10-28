import React from "react";

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => onAddToCart(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
