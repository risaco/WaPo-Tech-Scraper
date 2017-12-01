// Scraper Controller

// **** DEPENDENCIES ****
var db = require("../models"); // access to all models in the folder
var scrape = require("../scripts/scrape"); // access to the scraper script

module.exports = {
  scrapeArticles: function(req, res) {
    // scrape the Washington Post Tech articles
    return scrape()
      .then(function(articles) {
        // then add them to the database
        return db.Article.create(articles);
      })
      .then(function(dbArticle) {
        if (dbArticle.length === 0) {
          res.json({
            message: "Nothing new to see here...try again tomorrow!"
          });
        }
        else {
          res.json({
            message: "Added " + dbArticle.length + " new articles!"
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Scrape complete!"
        });
      });
  }
};
