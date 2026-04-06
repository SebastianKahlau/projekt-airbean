const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} = require("../controllers/orderController");

const validateOrder = require("../middleware/validateOrder");

router.post("/", validateOrder, createOrder);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:orderId", getOrderById);

module.exports = router;
