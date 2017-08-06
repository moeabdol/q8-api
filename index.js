var express    = require("express");
var path       = require("path");
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");
var config     = require("./config");
var routes     = require("./routes");

// Initialize express app
var app = express();

// Serve static files from "public" folder
app.use(express.static('public'));

// Parse request body as json
app.use(bodyParser.json());

// Don't use mongoose promises
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.prodDb, { useMongoClient: true}, (err) => {
  if (err) {
    console.log("Could not connect to database: " + config.prodDb, err);
  }
  else {
    console.log("Connected to database: ", config.prodDb);
  }
});

// Use api routes
app.use("/api", routes);

// Listen to port 3000
app.listen(3000, () => {
  console.log("Listening to port 3000");
});

module.exports = app;
