const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");

router.post("/", validateUser, createUser);

module.exports = router;
