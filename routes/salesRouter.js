const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router
  .post("/", salesController.create)
  .get("/history", salesController.index)
  .delete("/history/:id", salesController.delete);

module.exports = router;
