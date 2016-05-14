var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pasteSchema = new Schema({
  subject:String,
  content:String
});


model.exports = mongoose.model('Paste',pasteSchema);
