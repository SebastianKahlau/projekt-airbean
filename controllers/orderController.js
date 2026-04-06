const db = require("../models/db");

function createOrder(req, res, next) {
  const { userId, items, promoCode } = req.body;

  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) return next(err);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const productIds = items.map((item) => item.productId);
    const placeholders = productIds.map(() => "?").join(",");

    db.all(
      `SELECT * FROM products WHERE id IN (${placeholders})`,
      productIds,
      (err, products) => {
        if (err) return next(err);

        if (products.length !== productIds.length) {
          return res.status(400).json({
            error: "One or more products do not exist in the menu",
          });
        }

        let totalPrice = 0;

        const detailedItems = items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          const itemPrice = product.price;
          totalPrice += itemPrice * item.quantity;

          return {
            productId: item.productId,
            quantity: item.quantity,
            itemPrice,
          };
        });

        let discount = 0;
        let campaignApplied = null;

        if (promoCode === "DISCOUNT10") {
          discount = Math.round(totalPrice * 0.1);
          totalPrice = totalPrice - discount;
          campaignApplied = "DISCOUNT10";
        }

        const createdAt = new Date().toISOString();
        const status = "received";

        db.run(
          `INSERT INTO orders (user_id, total_price, status, created_at)
           VALUES (?, ?, ?, ?)`,
          [userId, totalPrice, status, createdAt],
          function (err) {
            if (err) return next(err);

            const orderId = this.lastID;

            const stmt = db.prepare(
              `INSERT INTO order_items (order_id, product_id, quantity, item_price)
               VALUES (?, ?, ?, ?)`,
            );

            detailedItems.forEach((item) => {
              stmt.run(orderId, item.productId, item.quantity, item.itemPrice);
            });

            stmt.finalize((err) => {
              if (err) return next(err);

              res.status(201).json({
                success: true,
                order: {
                  id: orderId,
                  userId,
                  totalPrice,
                  discount,
                  campaignApplied,
                  status,
                  createdAt,
                  items: detailedItems,
                },
              });
            });
          },
        );
      },
    );
  });
}

function getOrderById(req, res, next) {
  const { orderId } = req.params;

  db.get("SELECT * FROM orders WHERE id = ?", [orderId], (err, order) => {
    if (err) return next(err);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    db.all(
      `SELECT oi.*, p.name
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId],
      (err, items) => {
        if (err) return next(err);

        res.json({
          ...order,
          items,
        });
      },
    );
  });
}

function getOrdersByUserId(req, res, next) {
  const { userId } = req.params;

  db.all(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, orders) => {
      if (err) return next(err);
      res.json(orders);
    },
  );
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
};
