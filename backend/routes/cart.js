// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const db = require('../db');

function computeTotal(items) {
  return items.reduce((acc, it) => acc + it.price * it.qty, 0);
}

router.get('/', (req, res) => {
  const sql = `SELECT cart.id as id, cart.productId, cart.qty, products.name, products.price
               FROM cart JOIN products ON cart.productId = products.id`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const total = computeTotal(rows);
    res.json({ items: rows, total });
  });
});

router.post('/', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

  db.get('SELECT id, qty FROM cart WHERE productId = ?', [productId], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (row) {
      const newQty = row.qty + qty;
      db.run('UPDATE cart SET qty = ? WHERE id = ?', [newQty, row.id], function(err2) {
        if (err2) return res.status(500).json({ error: 'DB error' });
        res.json({ id: row.id, productId, qty: newQty });
      });
    } else {
      db.run('INSERT INTO cart (productId, qty) VALUES (?, ?)', [productId, qty], function(err3) {
        if (err3) return res.status(500).json({ error: 'DB error' });
        res.json({ id: this.lastID, productId, qty });
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM cart WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ deletedId: id });
  });
});

router.post('/checkout', (req, res) => {
  const sql = `SELECT cart.id, cart.productId, cart.qty, products.name, products.price
               FROM cart JOIN products ON cart.productId = products.id`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (rows.length === 0) return res.status(400).json({ error: 'Cart empty' });
    const total = computeTotal(rows);
    const receipt = {
      id: Date.now(),
      total,
      items: rows,
      timestamp: new Date().toISOString()
    };
    db.run('DELETE FROM cart', [], (err2) => {
      if (err2) console.error('Failed to clear cart after checkout', err2);
      res.json({ receipt });
    });
  });
});

module.exports = router;
