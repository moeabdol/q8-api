var express  = require("express");
var path     = require("path");
var mongoose = require("mongoose");
var config   = require("./config");
var routes   = require("./routes");

// Initialize express app
var app = express();

// Don't use mongoose promises
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.db, { useMongoClient: true}, (err) => {
  if (err) {
    console.log("Could not connect to database: " + config.db, err);
  }
  else {
    console.log("Connected to database: ", config.db);
  }
});

// Use api routes
app.use("/api", routes);

// Listen to port 3000
app.listen(3000, () => {
  console.log("Listening to port 3000");
});

module.exports = app;
