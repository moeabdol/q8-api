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

module.exports = {
  getOrders
};
