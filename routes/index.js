var express = require("express");
var router = express.Router();
var base = process.env.PWD;
var orders = require(base + "/controllers/orders");

router.get("/orders", orders.getOrders);

module.exports = router;
