const mongoose = require("mongoose");
const { model } = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
});
module.exports = model("Rating", ratingSchema);
