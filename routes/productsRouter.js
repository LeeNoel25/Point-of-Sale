const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': `"Name" must have at least 3 characters`,
    'any.required': `"This field is required"`
  }),
  imgurl: Joi.string().uri().required().messages({
    'string.uri': `"Url is not valid"`,
    'any.required': `"This field is required"`
  }),
  price: Joi.number().min(0.1).required().messages({
    'number.min': `"Price must be at least 10 cents"`,
    'any.required': `"This field is required"`
  }),
  brand: Joi.string().min(3).required().messages({
    'string.min': `"Brand" must have at least 3 characters`,
    'any.required': `"This field is required"`
  })
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

router
  .get("/", productsController.index)
  .post("/new",validateProduct, productsController.create)
  .get("/:id", productsController.show)
  .put("/:id", productsController.update)
  .delete("/:id", productsController.delete);

module.exports = router;
