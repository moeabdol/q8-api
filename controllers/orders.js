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
  order.save((err, order) => {
    if (err) {
      res.send(500, err);
    } else {
      res.json(201, order);
    }
  });
};

var updateOrder = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(404, err);
    } else {
      if (req.body.companyName) {
        order.companyName = req.body.companyName
      }
      if (req.body.customerAddress) {
        order.customerAddress = req.body.customerAddress
      }
      if (req.body.orderedItem) {
        order.orderedItem = req.body.orderedItem;
      }

      order.save((err, order) => {
        if (err) {
          res.send(500, err);
        } else {
          res.json(200, order);
        }
      });
    }
  });
};

var deleteOrder = (req, res) => {
  Order.findById(req.params.id, (err) => {
    if (err) {
      res.send(404, err);
    } else {
      res.json(200, { "deleted": true } );
    }
  });
};

var getOrdersByCompanyName = (req, res) => {
  Order.find({ companyName: req.params.companyName }, (err, orders) => {
    if (err) {
      res.send(404, err);
    } else {
      res.json(200, orders);
    }
  });
};

var getOrdersByCustomerAddress = (req, res) => {
  Order.find({ customerAddress: req.params.customerAddress }, (err, orders) => {
    if (err) {
      res.send(404, err);
    } else {
      res.json(200, orders);
    }
  });
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByCompanyName,
  getOrdersByCustomerAddress,
};
