const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    imgurl: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
