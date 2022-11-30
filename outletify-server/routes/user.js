const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get("/user/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(userId)
    .populate("cart")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

module.exports = router;
