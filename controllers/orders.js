var base = process.env.PWD;
var Order = require(base + "/models/order");

var getOrders = (req, res) => {
  Order.find((err, orders) => {
    if (err) {
      res.send(500, err);
    } else {
      res.json(200, orders);
    }
  });
};

var getOrder = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(404, err);
    } else {
      res.json(200, order);
    }
  });
};

var createOrder = (req, res) => {
  var order = new Order(req.body);
  order.save((err, post) => {
    if (err) {
      res.send(500, err);
    } else {
      res.json(201, order);
    }
  });
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
};
