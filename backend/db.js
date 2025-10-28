// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, 'db.sqlite');

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error('Could not open DB', err);
  } else {
    console.log('Connected to SQLite DB.');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY,
    productId INTEGER,
    qty INTEGER,
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);

  db.get('SELECT COUNT(*) as cnt FROM products', (err, row) => {
    if (!err && row.cnt === 0) {
      const stmt = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
      const seedProducts = [
        ['Red T-Shirt', 349.0],
        ['Blue Jeans', 999.0],
        ['Sneakers', 1999.0],
        ['Hat', 249.0],
        ['Sunglasses', 699.0],
        ['Backpack', 1299.0]
      ];
      seedProducts.forEach(p => stmt.run(p[0], p[1]));
      stmt.finalize();
      console.log('Seeded products');
    }
  });
});

module.exports = db;
