const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

//-------------------------------Routes------------------
const productsRouter = require("./routes/productsRouter");
const salesRouter = require("./routes/salesRouter");

//------------------------------Middleware---------------
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//-------------------------------Routes------------------
app.use("/api/products", productsRouter);
app.use("/api/sale", salesRouter);

//-------------------------------------------------------
const port = 3000;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
