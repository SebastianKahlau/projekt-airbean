function validateUser(req, res, next) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ error: "username must be a string" });
  }

  if (username.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "username must be at least 2 characters long" });
  }

  next();
}

module.exports = validateUser;
