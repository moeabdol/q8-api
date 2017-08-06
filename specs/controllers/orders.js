process.env.NODE_ENV = "test";

var base      = process.env.PWD;
var config    = require(base + "/config");
var mongoose  = require("mongoose");
var orders    = require(base + "/controllers/orders");
var Order     = require(base + "/models/order");
var should    = require("should");
var testUtils = require(base + "/specs/utils");

describe("Orders API", function(){
  var dummyOrder, id;

  before(function(done) {
    mongoose.connect(config.testDb, { useMongoClient: true }, () => {
      done();
    });

    dummyOrder = new Order({
      companyName: "dummy co",
      customerAddress: "somewhere in the horizon",
      orderedItem: "dummy bear"
    });

    dummyOrder.save(function(err, order) {
      if (err) { console.log(err); }
      id = order._id;
    });
  });

  describe("GET /api/orders", () => {
    it("should get all orders", (done) => {
      var req = {};
      var res = testUtils.responseValidator(200, (orders) => {
        orders.length.should.equal(1);
      });

      orders.getOrders(req, res);
      done();
    });
  });

  describe("GET /api/orders/:id", () => {
    it("should get order by id", (done) => {
      var req = { params: { id: id } };

      var res = testUtils.responseValidator(200, (order) => {
        order.should.have.property("companyName");
        order.companyName.should.equal("dummy co");
        order.should.have.property("customerAddress");
        order.customerAddress.should.equal("somewhere in the horizon");
        order.should.have.property("orderedItem");
        order.orderedItem.should.equal("dummy bear");
      });

      orders.getOrder(req, res);
      done();
    });

    it("should return 404 record not found if id doesn't exist", (done) => {
      var req = { params: { id: "gibberish" } };

      var res = testUtils.responseValidator(404, (err) => {});

      orders.getOrder(req, res);
      done();
    });
  });

  describe("POST /api/orders", () => {
    it("should create a new order", (done) => {
      var req = {
        body: {
          companyName: "my co",
          customerAddress: "abc st",
          orderedItem: "item 001"
        }
      };

      var res = testUtils.responseValidator(201, (order) => {
        order.should.have.property("companyName")
        order.companyName.should.equal("my co");
        order.should.have.property("customerAddress");
        order.customerAddress.should.equal("abc st");
        order.should.have.property("orderedItem");
        order.orderedItem.should.equal("item 001");
      });

      orders.createOrder(req, res);
      done();
    });
  });

  describe("PUT /api/orders/:id", () => {
    it("should update order if exists", (done) => {
      var req = {
        params: { id: id },
        body: {
          companyName: "my co."
        }
      };

      var res = testUtils.responseValidator(200, (order) => {
        order.should.have.property("companyName");
        order.companyName.should.equal("my co.");
      });

      orders.updateOrder(req, res);
      done();
    });

    it("should return 404 record not found if id doesn't exist", (done) => {
      var req = {
        params: { id: "gibberish" },
        body: {
          companyName: "my co."
        }
      };

      var res = testUtils.responseValidator(404, (err) => {});

      orders.updateOrder(req, res);
      done();
    });
  });

  describe("DELETE /api/orders/:id", () => {
    it("should delete order if exists", (done) => {
      var req = { params: { id: id } };
      var res = testUtils.responseValidator(200, (obj) => {
        obj.should.have.property("deleted");
        obj.deleted.should.equal(true);
      });

      orders.deleteOrder(req, res);
      done();
    });

    it("should return 404 record not found if id doesn't exist", (done) => {
      var req = { params: { id: "gibberish" } };
      var res = testUtils.responseValidator(404, (err) => {});

      orders.deleteOrder(req, res);
      done();
    });
  });

  describe("GET /api/orders/company/:companyName", () => {
    it("should get orders filtered by company name", (done) => {
      var req = { params: { companyName: dummyOrder.companyName } };
      var res = testUtils.responseValidator(200, (orders) => {
        orders.length.should.equal(1);
      });

      orders.getOrdersByCompanyName(req, res);
      done();
    });

    it("should return 404 record not found if company doesn't exist", (done) => {
      var req = { params: { companyName: "gibberish" } };
      var res = testUtils.responseValidator(404, (err) => {});

      orders.getOrdersByCompanyName(req, res);
      done();
    });
  });

  describe("GET /api/orders/customer/:customerAddress", () => {
    it("should get orders filtered by customer address", (done) => {
      var req = { params: { customerAddress: dummyOrder.customerAddress } };
      var res = testUtils.responseValidator(200, (orders) => {
        orders.length.should.equal(1);
      });

      orders.getOrdersByCustomerAddress(req, res);
      done();
    });

    it("should return 404 record not found if customer address doesn't exist",
      (done) => {
      var req = { params: { customerAddress: "gibberish" } };
      var res = testUtils.responseValidator(404, (err) => {});

      orders.getOrdersByCustomerAddress(req, res);
      done();
    });
  });

  after((done) => {
    Order.remove({}, (err) => {
      if (err) { console.log(err); }
    });
    mongoose.disconnect(done);
  });
});
