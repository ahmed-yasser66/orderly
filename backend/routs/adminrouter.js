const express = require("express");
const router = express.Router();

router.get("/admin/createmenu/");
router.post("/order/addtoorder/:id");
router.post("/order/createmenu");

router.module.exports = router;
