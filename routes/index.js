var express = require("express");
var router  = express.Router();
var base    = process.env.PWD;
var orders  = require(base + "/controllers/orders");

router.get("/orders", orders.getOrders);
router.get("/orders/:id", orders.getOrder);
router.post("/orders", orders.createOrder);
router.put("/orders/:id", orders.updateOrder);
router.delete("/orders/:id", orders.deleteOrder);
router.get("/orders/company/:companyName", orders.getOrdersByCompanyName);

module.exports = router;
