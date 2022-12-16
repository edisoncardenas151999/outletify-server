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
  const { userId } = req.params;
  User.findOneAndUpdate({ _id: userId }, { $set: { cart: [] } })
    .then((response) => {
      console.log("findOneAndUpdate");
      res.json(response);
    })
    .catch((err) => res.json(err));
});

router.delete("/cart/:itemId", isAuthenticated, (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.payload;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findOneAndUpdate({ _id: _id }, { $pull: { cart: itemId } })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/buyerItems", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  User.findById(userId)
    .populate("PurchasesList")
    .then((response) => res.json(response));
});

router.get("/item/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  User.find({ PurchasesList: { $in: [itemId] } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

router.get("/user", (req, res, next) => {
  const userId = req.params;
  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

module.exports = router;
