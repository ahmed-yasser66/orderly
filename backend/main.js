const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();
const DB = process.env.DB;

app.use(cors());

// app.get("/order/:orderId", (req, res) => {});
// app.get("/order/:orderId/items", (req, res) => {});

// app.post("order/:orderId", (req, res) => {});
// app.post("order/:orderId", (req, res) => {});
const router = require("./routs/orderrouter");
app.use("/orderly", router);

mongoose
  .connect(DB)
  .then((res) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("db err", err);
  });
