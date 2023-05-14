const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router
  .get("/", productsController.index)
  .post("/new", productsController.create)
  .get("/:id", productsController.show)
  .put("/:id", productsController.update)
  .delete("/:id", productsController.delete);

module.exports = router;
