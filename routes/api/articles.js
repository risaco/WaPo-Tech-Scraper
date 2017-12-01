// **** DEPENDENCIES ****
var router = require("express").Router();
var articleController = require("../../controllers/article");

// Find All Articles
router.get("/", articleController.findAll);
// Delete one article
router.delete("/:id", articleController.delete);
// Update one article
router.put("/:id", articleController.update);

module.exports = router;
