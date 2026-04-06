const db = require("./db");
const fs = require("fs");
const path = require("path");

function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        total_price INTEGER NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        item_price INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
      if (err) {
        console.error("Fel vid kontroll:", err.message);
        return;
      }

      if (row.count === 0) {
        const menuPath = path.join(__dirname, "../data/menu.json");
        const menuData = JSON.parse(fs.readFileSync(menuPath, "utf8"));

        const stmt = db.prepare(`
          INSERT INTO products (id, name, price, category)
          VALUES (?, ?, ?, ?)
        `);

        menuData.forEach((item) => {
          stmt.run(item.id, item.name, item.price, item.category || null);
        });

        stmt.finalize();
        console.log("Menydata inlagd!");
      }
    });
  });
}

module.exports = initDb;
