var TxtImg = require("../models/txtImg.js");
var Answer = require("../models/Answer.js");
var QuestionsAnswers = require("../models/questionsAnswers.js");
var Quiz = require("../models/quiz.js");

var data = null;
var quiz_id = null;
var q_a_id = null;
var error = false;

function nextPropAnswers(val, ind) {
    var aTxtImg = new TxtImg({ txt: data.q_a[val].propAnswers[ind].txt, img: data.q_a[val].propAnswers[ind].img });
    aTxtImg.save(function (err, doc2) {
        if (err) console.log("" + err);
        else {
            var newAnswer = new Answer({ dataId: doc2._id, isCorrect: data.q_a[val].propAnswers[ind].isCorrect });
            newAnswer.save(function (err, docAns) {
                if (err) console.log("Answer's Insertion Has Error: " + err);
                else {
                    QuestionsAnswers.findOneAndUpdate({ "_id": q_a_id },
                        { $push: { propAnswers: docAns._id } },
                        { new: true }, function (err, docQA) {
                            if (err) {
                                console.log("Next Proposed Answer Error: " + err);
                                error = true;
                            }
                            else
                                grapPropAnswers(val, ind + 1);
                        });
                }
            });
        }
    });
}

function grapPropAnswers(val, ind) {
    if (ind < data.q_a[val].propAnswers.length)
        nextPropAnswers(val, ind);
    else {
        save1Question(q_a_id); // !!!!!!!! We need to save this Question
        untilDone(val + 1);
    }
}

function startByQuestion(val) {
    var newTxtImg = new TxtImg({ txt: data.q_a[val].question.txt, img: data.q_a[val].question.img });
    newTxtImg.save(function (err, doc) {
        if (err) console.log(err);
        else {
            QuestionsAnswers.findOneAndUpdate({ "_id": q_a_id }, { question: doc._id }, { new: true }, function (err, newdoc) {
                if (err) {
                    console.log("Start By Question Error: " + err);
                    error = true;
                }
                else {
                    grapPropAnswers(val, 0);
                }
            });
        }
    });
}

function untilDone(val) {
    if (val < data.q_a.length) {
        var newQuestionsAnswers = new QuestionsAnswers({ subject: data.q_a[val].subject, question: null, propAnswers: [], refs: data.q_a[val].refs });
        newQuestionsAnswers.save(function (err, doc) {
            if (err) {
                console.log("Until is Done Error: " + err);
                error = true;
            }
            else {
                q_a_id = doc._id;
                startByQuestion(val);
            }
        });
    }
}

function save1Question(q_id) {
    Quiz.findOneAndUpdate({ "_id": quiz_id }, { $push: { q_a: q_id } }, { new: true }, function (err, newdoc) {
        if (err) {
            console.log("Save One Question Error: " + err);
            error = true;
        }
    });
}

var saveAQuiz = function (rawData) {
    quiz_id = null;
    data = rawData;
    var newQuestionsAnswers = new QuestionsAnswers({});
    // Clear completely the database so we could see the effect of the default (or the new) ...
    TxtImg.remove({}).then(() => {
        QuestionsAnswers.remove({}).
            then(() => {
                Answer.remove({}).
                    then(() => {
                        Quiz.remove({}).then(() => {
                            console.log("Init - The Database is Empty!");
                            var newQuiz = new Quiz({ name: data.name, subject: data.subject, q_a: [] });
                            newQuiz.save(function (err, doc) {
                                if (err) console.log("Save Quiz Process's Error: " + err);
                                else {
                                    quiz_id = doc._id;
                                    untilDone(0);
                                }
                            });
                        });
                    });
            });
    });
};

module.exports = saveAQuiz;
