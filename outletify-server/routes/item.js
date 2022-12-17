const express = require("express");
const router = express.Router();
const Item = require("../models/Item.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const mongoose = require("mongoose");
const User = require("../models/User.model");

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
    .populate("rating")
    .then((project) => res.status(200).json(project))
    .catch((error) => res.json(error));
});

router.post("/order/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.payload._id;
  User.findByIdAndUpdate(userId, { $push: { cart: id } })
    .then((updatedId) => res.json(updatedId))
    .catch((err) => res.json(err));
});

router.get("/item/:itemId/edit", (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findById(itemId)
    .then((item) => res.status(200).json(item))
    .catch((error) => res.json(error));
});

router.put("/item/:itemId/edit", (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findByIdAndUpdate(itemId, req.body, { new: true })
    .then((updatedItem) => res.json(updatedItem))
    .catch((error) => res.json(error));
});

router.delete("/item/:itemId/delete", (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Item.findByIdAndRemove(itemId)
    .then(() =>
      res.json({
        message: `Project with ${itemId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});
module.exports = router;
