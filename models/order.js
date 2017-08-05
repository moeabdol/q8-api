var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

mongoose.Promise = global.Promise;

var OrderSchema = new Schema({
  companyName: String,
  customerAddress: String,
  orderedItem: String
});

module.exports = mongoose.model("Order", OrderSchema);
