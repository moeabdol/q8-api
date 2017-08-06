var express = require("express");
var router  = express.Router();
var base    = process.env.PWD;
var orders  = require(base + "/controllers/orders");

/**
 * @apiVersion 1.0.0
 * @apiName getOrders
 * @api {get} /api/orders List all orders
 * @apiGroup Orders
 * @apiSuccess {Object[]} orders Orders list
 * @apiSuccess {ObjectId(hexadecimal)} orders._id Order's ID
 * @apiSuccess {String} orders.companyName Order's company name
 * @apiSuccess {String} orders.customerAddress Order's customer address
 * @apiSuccess {String} orders.orderedItem Order's item name
 * @apiSuccess {Number} orders.__v Order's document version
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *        "companyName": "SuperTrader",
 *        "customerAddress": "Steindamm 80",
 *        "orderedItem": "Macbook",
 *        "__v": 0
 *      },
 *      {
 *        "_id": ObjectId("59864d2865b37225c9b1fb67"),
 *        "companyName": "Cheapskates",
 *        "customerAddress": "Reeperbahn 153",
 *        "orderedItem": "Inline Skates",
 *        "__v": 0
 *      }
 *    ]
 * @apiErrorExample {json} 500 Failure
 *    HTTP/1.1 500 Internal Server Error
 */
router.get("/orders", orders.getOrders);

/**
 * @apiVersion 1.0.0
 * @apiName getOrderById
 * @api {get} /api/orders/:id Find order by ID
 * @apiGroup Orders
 * @apiParam {String} :id Order ID
 * @apiSuccess {Object} order Order
 * @apiSuccess {ObjectId(hexadecimal)} order._id Order's ID
 * @apiSuccess {String} order.companyName Order's company name
 * @apiSuccess {String} order.customerAddress Order's customer address
 * @apiSuccess {String} order.orderedItem Order's item name
 * @apiSuccess {Number} order.__v Order's document version
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *      "companyName": "SuperTrader",
 *      "customerAddress": "Steindamm 80",
 *      "orderedItem": "Macbook",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} 404 Failure
 *    HTTP/1.1 404 Record Not Fount
 */
router.get("/orders/:id", orders.getOrder);

/**
 * @apiVersion 1.0.0
 * @apiName createOrder
 * @api {post} /api/orders Create new order
 * @apiGroup Orders
 * @apiParam {String} companyName Order's company Name
 * @apiParam {String} customerAddress Order's customer address
 * @apiParam {String} orderedItem Order's item
 * @apiParamExample {json} Input
 *    {
 *      "companyName": "SuperTrader",
 *      "customerAddress": "Steindamm 80",
 *      "orderedItem": "Macbook",
 *    }
 * @apiSuccess (Created 201) {Object} order Order
 * @apiSuccess (Created 201) {ObjectId(hexadecimal)} order._id Order's ID
 * @apiSuccess (Created 201) {String} order.companyName Order's company name
 * @apiSuccess (Created 201) {String} order.customerAddress Order's customer address
 * @apiSuccess (Created 201) {String} order.orderedItem Order's item name
 * @apiSuccess (Created 201) {Number} order.__v Order's document version
 * @apiSuccessExample {json} 201 Success
 *    HTTP/1.1 201 CREATED
 *    {
 *      "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *      "companyName": "SuperTrader",
 *      "customerAddress": "Steindamm 80",
 *      "orderedItem": "Macbook",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} 500 Failure
 *    HTTP/1.1 500 Internal Sever Error
 */
router.post("/orders", orders.createOrder);

/**
 * @apiVersion 1.0.0
 * @apiName updateOrder
 * @api {put} /api/orders/:id Update order
 * @apiGroup Orders
 * @apiParam {String} :id Order's ID
 * @apiParam {String} companyName Order's company Name
 * @apiParam {String} customerAddress Order's customer address
 * @apiParam {String} orderedItem Order's item
 * @apiParamExample {json} Input
 *    {
 *      "companyName": "SuperTrader",
 *      "customerAddress": "Steindamm 80",
 *      "orderedItem": "Macbook",
 *    }
 * @apiSuccess {Object} order Order
 * @apiSuccess {ObjectId(hexadecimal)} order._id Order's ID
 * @apiSuccess {String} order.companyName Order's company name
 * @apiSuccess {String} order.customerAddress Order's customer address
 * @apiSuccess {String} order.orderedItem Order's item name
 * @apiSuccess {Number} order.__v Order's document version
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 SUCCESS
 *    {
 *      "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *      "companyName": "SuperTrader",
 *      "customerAddress": "Steindamm 80",
 *      "orderedItem": "Macbook",
 *      "__v": 0
 *    }
 * @apiErrorExample {json} 404 Failure
 *    HTTP/1.1 404 Record Not Found
 * @apiErrorExample {json} 500 Failure
 *    HTTP/1.1 500 Internal Sever Error
 */
router.put("/orders/:id", orders.updateOrder);

/**
 * @apiVersion 1.0.0
 * @apiName deleteOrder
 * @api {delete} /api/orders/:id Delete order
 * @apiGroup Orders
 * @apiParam {String} :id Order's ID
 * @apiSuccess {Boolean} deleted Deleted status
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 SUCCESS
 *    {
 *      "deleted": true
 *    }
 * @apiErrorExample {json} 404 Failure
 *    HTTP/1.1 404 Record Not Found
 */
router.delete("/orders/:id", orders.deleteOrder);

/**
 * @apiVersion 1.0.0
 * @apiName getOrdersByCompanyName
 * @api {get} /api/orders/company/:companyName Find orders by company name
 * @apiGroup Orders
 * @apiParam {String} :companyName Company name
 * @apiSuccess {Object[]} orders Order list for a specific company
 * @apiSuccess {ObjectId(hexadecimal)} order._id Order's ID
 * @apiSuccess {String} order.companyName Order's company name
 * @apiSuccess {String} order.customerAddress Order's customer address
 * @apiSuccess {String} order.orderedItem Order's item name
 * @apiSuccess {Number} order.__v Order's document version
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *        "companyName": "SuperTrader",
 *        "customerAddress": "Steindamm 80",
 *        "orderedItem": "Macbook",
 *        "__v": 0
 *      },
 *      {
 *        "_id": ObjectId("59864d2865b37225c9b1fb67"),
 *        "companyName": "SuperTrader",
 *        "customerAddress": "Reeperbahn 153",
 *        "orderedItem": "Inline Skates",
 *        "__v": 0
 *      }
 *    ]
 * @apiErrorExample {json} 404 Failure
 *    HTTP/1.1 404 Record Not Fount
 */
router.get("/orders/company/:companyName", orders.getOrdersByCompanyName);

/**
 * @apiVersion 1.0.0
 * @apiName getOrdersByCustomerAddress
 * @api {get} /api/orders/customer/:customerAddress Find orders by customer address
 * @apiGroup Orders
 * @apiParam {String} :customerAddress Customer address
 * @apiSuccess {Object[]} orders Order list for a specific customer's address
 * @apiSuccess {ObjectId(hexadecimal)} order._id Order's ID
 * @apiSuccess {String} order.companyName Order's company name
 * @apiSuccess {String} order.customerAddress Order's customer address
 * @apiSuccess {String} order.orderedItem Order's item name
 * @apiSuccess {Number} order.__v Order's document version
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "_id": ObjectId("59864b2767cee51b0bb2c174"),
 *        "companyName": "SuperTrader",
 *        "customerAddress": "Steindamm 80",
 *        "orderedItem": "Macbook",
 *        "__v": 0
 *      },
 *      {
 *        "_id": ObjectId("59864d2865b37225c9b1fb67"),
 *        "companyName": "Cheapskates",
 *        "customerAddress": "Steindamm 80",
 *        "orderedItem": "Inline Skates",
 *        "__v": 0
 *      }
 *    ]
 * @apiErrorExample {json} 404 Failure
 *    HTTP/1.1 404 Record Not Fount
 */
router.get("/orders/customer/:customerAddress",
  orders.getOrdersByCustomerAddress);

/**
 * @apiVersion 1.0.0
 * @apiName getTrends
 * @api {get} /api/orders/items/trends List trending items in descending order
 * @apiGroup Orders
 * @apiSuccess {Object[]} items Trending items list in descending order
 * @apiSuccess {String} items._id Item's name
 * @apiSuccess {Number} items.count Item's count
 * @apiSuccessExample {json} 200 Success
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "_id": "Macbook",
 *        "count": 3
 *      },
 *      {
 *        "_id": "Inline skates",
 *        "count": 2
 *      },
 *      {
 *        "_id": "Flux compensator",
 *        "count": 1
 *      }
 *    ]
 * @apiErrorExample {json} 500 Failure
 *    HTTP/1.1 500 Internal Server Error
 */
router.get("/orders/items/trends", orders.getTrends);

module.exports = router;
