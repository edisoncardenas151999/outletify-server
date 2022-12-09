const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sellSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = model("Sell", sellSchema);
