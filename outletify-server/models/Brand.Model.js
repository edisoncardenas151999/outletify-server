const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const brandSchema = new Schema({
  name: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  description: String,
});

module.exports = model("Category", brandSchema);
