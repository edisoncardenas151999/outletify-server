const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/Item.model");
const Rating = require("../models/Rating.model");

router.post("/save-rating/:itemId", (req, res, next) => {
  const { rate } = req.body;
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Rating.create({ rate })
    .then((newItem) => {
      return Item.findByIdAndUpdate(itemId, {
        $set: { rating: newItem },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
