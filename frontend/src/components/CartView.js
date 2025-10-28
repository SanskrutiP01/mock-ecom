import React from "react";

function CartView({ cart, onRemove }) {
  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.qty}
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{cart.total}</h3>
    </div>
  );
}

export default CartView;
