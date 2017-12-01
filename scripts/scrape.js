// Script for scraper

// **** DEPENDENCIES ****
var axios = require("axios");
var cheerio = require("cheerio");

// scrape function
var scrape = function() {
  return axios.get("https://www.washingtonpost.com/business/technology")
  .then(function(res) {
    var $ = cheerio.load("res.data");

    // an array to hold the results
    var articles = [];

    // grabbing every story headline
    $("div.story-list-story").each(function(i, element) {
      // find each title, link, and summary and store them
      var title = $(this)
        .children(".story-body")
        .children(".story-headline")
        .find("h3").find("a").text().trim();
      var link = $(this)
        .children(".story-body")
        .children("div.story-headline")
        .find("h3").find("a").attr("href");
      var summary = $(this)
        .children(".story-body")
        .children("div.story-description")
        .find("p").text().trim();
      var image = $(this)
        .children(".story-image")
        .find("a").find("img").attr("src");

      // As long as the title, link, and summary are not empty...
      //if(title && link && summary){
        // Save these results in an object that pushes to the articles array
        var articleData = {
          title: title,
          link: link,
          summary: summary,
          image: image
        };

        articles.push(articleData);
      //}
    });
    return articles;

  }); // END of request function
}; // END of scrape function

// Export the function so it can be used
module.exports = scrape;
