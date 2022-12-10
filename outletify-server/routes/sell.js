const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Item = require("../models/Item.model");

router.post("/sell/:userId", (req, res, next) => {
  const { name, description, price, img } = req.body;
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.create({ name, description, price, img })
    .then((newItem) => {
      return User.findByIdAndUpdate(userId, {
        $push: { inventory: newItem._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/inventory/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .populate("cart")
    .then((response) => res.json(response));
});

module.exports = router;
