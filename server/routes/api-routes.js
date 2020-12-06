var data = require("../data/sample.js");
var Build = require("../data/saveQuizController.js");
var TxtImg = require("../models/txtImg.js");
var Answer = require("../models/Answer.js");
var QuestionsAnswers = require("../models/questionsAnswers.js");
var Quiz = require("../models/quiz.js");

var aQuiz = {};
var response = null;
var rawData = null;

Promise = require('bluebird');
var promises = [];

module.exports = function (app) {

  app.get("/api/quiz/play", function (req, res) {
    response = res;
    Quiz.find({}).populate({ //!!!!!!!!!!!!!!!!!!!!!!! POPULATE
      path: "q_a",
      model: "QuestionsAnswers",
      populate: [{
        path: "question",
        model: "TxtImg"
      }, {
        path: "propAnswers",
        model: "Answer"
      }]
    }).exec(function (err, data) {
      // For now, It seens that Mongoose could not "POPULATE" for grandchildren, 
      //     we have to do it by "hand"
      if (!err) {
        aQuiz = data;
        for (let i = 0; i < aQuiz.length; i++) {
          for (let j = 0; j < aQuiz[i].q_a.length; j++) {
            for (let k = 0; k < aQuiz[i].q_a[j].propAnswers.length; k++) {
              //!!!!!!!!!!!!!!!!!!!!!!!!!!!! Adding Promise
              promises.push(
                TxtImg.find({ "_id": aQuiz[i].q_a[j].propAnswers[k].dataId }, function (err, data) {
                  if (!err) {
                    var ob = {};
                    ob.txt = data[0].txt;
                    ob.img = data[0].img;
                    ob._id = aQuiz[i].q_a[j].propAnswers[k].dataId;
                    ob.isCorrect = aQuiz[i].q_a[j].propAnswers[k].isCorrect;
                    aQuiz[i].q_a[j].propAnswers[k] = ob
                  }
                  else
                    console.log("Oh la Vache!");
                }));
            }
          }
          Promise.all(promises).then(function (results) { //!!!!!!!!!!!!!!!!!!!!!!!!!!! PROMISE
            response.send(aQuiz);
          })
        }
      }});

  });


  app.post("/api/quiz/add", function (req, res) {
    Build(req.body);
    setTimeout(function () {
      res.send("Recorded!")
    }, 500);

  });

};
