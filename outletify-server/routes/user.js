const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get("/user/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(userId)
    .populate("cart")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

router.get("/updatedUser/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

router.post("/cart/:userId", (req, res) => {
  const userId = req.params;
  User.findOneAndUpdate(userId, { $set: { cart: [] } })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.post("/cart/:itemId", (req, res) => {
  const itemId = req.params;
  User.deleteOne({ cart: itemId })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/user", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

module.exports = router;
