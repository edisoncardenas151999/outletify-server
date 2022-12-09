const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    inventory: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    cart: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
