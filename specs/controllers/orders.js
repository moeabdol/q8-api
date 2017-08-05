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
      console.log("Connected to: ", config.testDb);
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

  after(function(done) {
    Order.remove({}, (err) => {
      if (err) { console.log(err); }
    });
    mongoose.disconnect(done);
  });
});
