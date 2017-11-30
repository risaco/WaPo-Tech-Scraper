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

// A GET to scrape the WaPo Tech Site
app.get("/scrape", function(req, res) {
  request("https://www.washingtonpost.com/business/technology", function(error, response, html) {
    var $ = cheerio.load("html");

    // an array to hold the results
    var results = [];

    // grabbing every story headline
    $("div.story-list-story").each(function(i, element) {

      var title = $(element).find("div.story-headline").find("h3").find("a").text();
      var link = $(element).find("div.story-headline").find("h3").find("a").attr("href");
      var summary = $(element).find("div.story-description").find("p").text();

      // Save these results in an object that pushes to the results array
      results.push({
        title: title,
        link: link,
        summary: summary
      });

      // Create a new Article using the scrape results object
      db.Article.create(results).then(function(dbArticle){
        // If successful...
        res.send("Scrape Complete");
      })
      .catch(function(err) {
        // If an error...
        res.json(err);
      }); // END of new database item
    });

    console.log(results);

  }); // END of scrape function
}); // END of GET scrape route


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
