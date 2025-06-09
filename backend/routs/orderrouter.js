const express = require("express");
const router = express.Router();
const orderController = require("../controller/ordering");
// const orderItem = require("./orderItem");
router.get("/order/getorder/:id", orderController.getOrder);
router.post("/order/addtoorder/:id", orderController.addtoOrder);

router.module.exports = router;
