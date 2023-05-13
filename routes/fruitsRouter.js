const express = require("express");
const router = express.Router();
const fruitsController = require("../controllers/fruitsController");

router
.get("/", fruitsController.index)
.post("/new", fruitsController.create)
.get("/:id", fruitsController.show)
.put("/:id", fruitsController.update)
.delete("/:id", fruitsController.delete);

module.exports = router;
