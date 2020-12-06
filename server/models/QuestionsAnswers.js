// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create the Question schema
var QuestionsAnswersSchema = new Schema({
  subject:{  type:String },
  question:{    
    type: Schema.Types.ObjectId,
    ref: "TxtImg"
  },
  propAnswers: [{
      type: Schema.Types.ObjectId,
      ref: "Answer"
  }],
  refs:{ type:String }
});

var QuestionsAnswers = mongoose.model("QuestionsAnswers", QuestionsAnswersSchema);
module.exports = QuestionsAnswers;