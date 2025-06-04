const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

// app.get("/order/:orderId", (req, res) => {});
// app.get("/order/:orderId/items", (req, res) => {});

// app.post("order/:orderId", (req, res) => {});
// app.post("order/:orderId", (req, res) => {});
const router = require("./routs/router");
app.use("/orderly", router);

mongoose
  .connect(
    "mongodb+srv://3adool:3adoolDB@orderly.f1nd6uf.mongodb.net/?retryWrites=true&w=majority&appName=orderly"
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("db err", err);
  });
