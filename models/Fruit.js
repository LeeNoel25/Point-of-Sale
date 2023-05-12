const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FruitSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    imgurl: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fruit", FruitSchema);