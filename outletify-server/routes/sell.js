const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Item = require("../models/Item.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/sell/:userId", (req, res, next) => {
  const { name, description, price, img, category } = req.body;
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.create({ name, description, price, img, category })
    .then((newItem) => {
      return User.findByIdAndUpdate(userId, {
        $push: { inventory: newItem._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/buyCart/:userId", isAuthenticated, (req, res) => {
  const { userId } = req.params;
  console.log(userId, "userId");
  const { cartId } = req.body;
  console.log(cartId);
  User.updateOne(
    { _id: userId },
    { $push: { PurchasesList: { $each: cartId } } }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => res.json(err));
});

router.post("/buy/:itemId", isAuthenticated, (req, res) => {
  const userId = req.payload._id;
  console.log(userId, "userId");
  const { itemId } = req.params;
  User.updateOne({ _id: userId }, { $push: { PurchasesList: itemId } })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => res.json(err));
});

router.get("/inventory/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("inventory")
    .then((response) => res.json(response));
});

module.exports = router;
