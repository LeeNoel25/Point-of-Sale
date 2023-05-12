const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema ({
    fruit: { type: Schema.Types.ObjectId, ref: 'Fruit', required: true },
    quantity: { type: Number, required: true, min: 1 },
}, {
    timestamps: true
})

const SaleSchema = new Schema(
  {
    items: [itemSchema],
    total: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);