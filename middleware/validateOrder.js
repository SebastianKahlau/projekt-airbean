function validateOrder(req, res, next) {
  const { userId, items } = req.body || {};

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  if (!items) {
    return res.status(400).json({ error: "items is required" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }

  for (const item of items) {
    if (typeof item.productId !== "number") {
      return res
        .status(400)
        .json({ error: "Each item must contain a numeric productId" });
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return res
        .status(400)
        .json({ error: "Each item must contain a quantity of at least 1" });
    }
  }

  next();
}

module.exports = validateOrder;
