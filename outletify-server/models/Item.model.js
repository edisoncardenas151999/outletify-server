const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    user: { type: Schema.Types.ObjectId, ref: "User" },
    brand: String,
  },
  {
    timestamps: true,
  }
);
module.exports = model("Item", itemSchema);
