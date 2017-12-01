// Script for scraper

// **** DEPENDENCIES ****
var request = require("request");
var cheerio = require("cheerio");

// scrape function
var scrape = function() {
  request("https://www.washingtonpost.com/business/technology", function(error, response, html) {
    var $ = cheerio.load("html");

    // an array to hold the results
    var articles = [];

    // grabbing every story headline
    $("div.story-list-story").each(function(i, element) {
      // find each title, link, and summary and store them
      var title = $(element)
        .find("div.story-headline").find("h3").find("a").text().trim();
      var link = $(element)
        .find("div.story-headline").find("h3").find("a").attr("href");
      var summary = $(element)
        .find("div.story-description").find("p").text().trim();
      var image = $(element)
        .find("div.story-image").find("img").attr("src");

      // As long as the title, link, and summary are not empty...
      if(title && link && summary){
        // Save these results in an object that pushes to the articles array
        var articleData = {
          title: title,
          link: link,
          summary: summary,
          image: image
        };

        articles.push(articleData);
      }
    });
    return articles;
  }); // END of request function
}; // END of scrape function

// Export the function so it can be used
module.exports = scrape;
