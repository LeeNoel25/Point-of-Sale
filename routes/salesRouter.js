const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router
  .post("/", salesController.create)
  //history page
  .get("/history", salesController.index)
  .delete("/history/:saleId", salesController.delete);

module.exports = router;
