// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create the Txt and Img schema
var TxtImgSchema = new Schema({
  txt: {  type: String },
  img: {  type: String }
});

var TxtImg = mongoose.model("TxtImg", TxtImgSchema);
module.exports = TxtImg;