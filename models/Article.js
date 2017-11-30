// Article model

// ***** DEPENDENCIES *****
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// save a reference to the Schema constructor
var articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  },
});

// creates model from the above Schema
var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
