// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create test schema
var QuizSchema = new Schema({
  // Example: "jQuery for Dummies"
  name: { type: String },  
  subject: { type: String },
  q_a:[{    
    type: Schema.Types.ObjectId,
    ref: "QuestionsAnswers"
  }]
});

QuizSchema.method({});

// Create the Quiz model with the QuizSchema
var Quiz = mongoose.model("Quiz", QuizSchema);

// Export the model
module.exports = Quiz;
