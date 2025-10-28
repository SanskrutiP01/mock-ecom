import React, { useState } from "react";

function CheckoutModal({ onCheckout, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Checkout</h2>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => onCheckout(name, email)}>Submit</button>
        <button className="close" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;
