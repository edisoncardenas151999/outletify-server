const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  description: String,
});

module.exports = model("Category", categorySchema);
