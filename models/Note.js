// ***** DEPENDENCIES *****
var mongoose = require("mongoose");

// save a reference to the Schema constructor
var Shema = mongoose.Schema;

// making the Note Schema
var NoteSchema = new Schema({
  title: String,
  body: String,
  author: String
});

// creates the model using the above schema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
