const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    img: { type: String },
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Schema.Types.ObjectId, ref: "Rating" },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Item", itemSchema);
