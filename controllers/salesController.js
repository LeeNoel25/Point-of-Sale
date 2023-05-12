const Fruit = require("../models/Fruit");
const Sale = require("../models/Sale");

const create = async (req, res) => {
  try {
    const createdSale = await Sale.create(req.body);
    res.status(201).json(createdSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const allSales = await Sale.find({});
    res.status(200).json(allSales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    create,
    index,
    delete: deleteSale,
};