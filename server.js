// ***** DEPENDENCIES *****
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// ***** INITIALIZING EXPRESS *****
var app = express();

// Require Routes
var routes = require("./routes");

// using morgan logger for logging requests
app.use(logger("dev"));
// using body-parser for handling form submission
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Setting up handlebars
var exphbs = require("express-handlebars");
// Set default layout to main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Set the view engine to handlebars
app.set("view engine", "handlebars");

// Use our Routes
app.use(routes);

// If deployed, this variable will use deployed database, otherwise it run locally on the local database
var MONGODB_URI = process.env.MONGOD_URI || "mongodb://localhost/wapoTechNews"
// Set mongoose
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
