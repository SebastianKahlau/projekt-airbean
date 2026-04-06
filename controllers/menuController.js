const db = require("../models/db");

function getMenu(req, res, next) {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return next(err);
    }

    res.json(rows);
  });
}

module.exports = { getMenu };
