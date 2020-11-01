const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
  image: String,
  title: String,
  description: String,
  reviews: Array
});

module.exports = mongoose.model("items", Item);
