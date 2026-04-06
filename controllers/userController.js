const db = require("../models/db");
const { v4: uuidv4 } = require("uuid");

function createUser(req, res, next) {
  const { username } = req.body;
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const sql = `
    INSERT INTO users (id, username, created_at)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [id, username.trim(), createdAt], function (err) {
    if (err) {
      return next(err);
    }

    res.status(201).json({
      success: true,
      user: {
        id,
        username: username.trim(),
        created_at: createdAt,
      },
    });
  });
}

module.exports = { createUser };
