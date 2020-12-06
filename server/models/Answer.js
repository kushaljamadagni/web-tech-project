// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create the Txt and Img schema
var answerSchema = new Schema({
  dataId:{   
    type: Schema.Types.ObjectId,
    ref: "TxtImg"
  },
  isCorrect:{  type:Boolean }
});

var Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;