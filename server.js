// ***** DEPENDENCIES *****
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// ***** SCRAPING TOOLS *****
var request = require("request"); // similar to AJAX method from jQuery
var cheerio = require("cheerio"); // for scraping

// ***** REQUIRING ALL MODELS *****
var db = require("./models");

var PORT = 3000;

// ***** INITIALIZING EXPRESS *****
var app = express();

// Setting up handlebars
var exphbs = require("express-handlebars");

// Set default layout to main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

// Set the view engine to handlebars
app.set("view engine", "handlebars");


// using morgan logger for logging requests
app.use(logger("dev"));
// using body-parser for handling form submission
app.use(bodyParser.urlencoded({ extended: false}));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/wapoTechNews", {
  useMongoClient: true
});

var wapoArticles = []; //holds array of articles in the database

// ***** ROUTING *****
// app.get("/", function(req,res) {
//   res.render("main.handlebars");
// });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
