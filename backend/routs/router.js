const express = require("express");
const router = express.Router();
const orderController = require("../controller/ordering");
// const orderItem = require("./orderItem");
router.get("/order/:id", orderController.getOrder);
router.post("/order/:id", orderController.addtoOrder);
module.exports = router;
