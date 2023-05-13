const Fruit = require("../models/Fruit");

const create = async (req, res) => {
  try {
    console.log(req.body);
    const createdFruit = await Fruit.create(req.body);
    res.status(201).json(createdFruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const allFruits = await Fruit.find({});
    res.status(200).json(allFruits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const showFruit = await Fruit.findById(req.params.id);
    res.status(200).json(showFruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedFruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFruit = async (req, res) => {
  try {
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedFruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  index,
  delete: deleteFruit,
  update,
  show,
};
