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
        done();
      });

      orders.getOrders(req, res);
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
        done();
      });

      orders.getOrder(req, res);
    });

    it("should return 404 record not found if id doesn't exist", (done) => {
      var req = { params: { id: "gibberish" } };

      var res = testUtils.responseValidator(404, (err) => {
        done();
      });

      orders.getOrder(req, res);
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
        done();
      });

      orders.createOrder(req, res);
    });
  });

  after(function(done) {
    Order.remove({}, (err) => {
      if (err) { console.log(err); }
    });
    mongoose.disconnect(done);
  });
});
