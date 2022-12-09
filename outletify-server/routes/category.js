const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");
const Item = require("../models/Item.model");

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

router.get("/category/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  Category.findById(categoryId)
    .populate("items")
    .then((response) => res.json(response));
});

module.exports = router;
