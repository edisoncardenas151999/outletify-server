const express = require("express");
const router = express.Router();
const Item = require("../models/Item.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Category = require("../models/Category.model");

router.post("/item/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  const { name, category, description, price, img } = req.body;
  Item.create({ name, description, category, price, img })
    .then((item) => {
      return Category.findByIdAndUpdate(categoryId, {
        $push: { items: item._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/allItems", (req, res, next) => {
  Item.find()
    .then((Items) => res.json(Items))
    .catch((err) => res.json(err));
});

router.get("/items/:itemId", (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findById(itemId)
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});

router.post("/order/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.payload._id;
  console.log(userId);

  User.findByIdAndUpdate(userId, { $push: { cart: id } })
    .then((updatedId) => res.json(updatedId))
    .catch((err) => res.json(err));
});

module.exports = router;
