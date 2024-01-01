let mongoose = require("mongoose");
let prodsch = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  oldprice: Number,
  img: String,
});
module.exports = mongoose.model("prod", prodsch);
