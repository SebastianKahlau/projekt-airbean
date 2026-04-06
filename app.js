const express = require("express");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Airbean API is running" });
});

app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
