// Sets up our routes to be used

// **** DEPENDENCIES ****
var router = require("express").Router();
var scrapeRoutes = require("./scraper");
var noteRoutes = require("./notes");
var articleRoutes = require("./articles");

router.use("/scrape", scrapeRoutes);
router.use("/notes", noteRoutes);
router.use("/articles", articleRoutes);

module.exports = router;
