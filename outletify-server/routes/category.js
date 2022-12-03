const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const Category = require("../models/Category.model");
const Item = require("../models/Item.model");

router.get("/category/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  Category.findById(categoryId)
    .populate("items")
    .then((response) => res.json(response));
});

module.exports = router;
