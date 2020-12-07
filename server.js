// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect("mongodb://public:quizdinh@ds143132.mlab.com:43132/quizfullstackjs");
var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

require("./server/routes/api-routes.js")(app);
require("./server/routes/html-routes.js")(app);
// -------------------------------------------------

var defaultQuiz = require("./server/data/saveQuizController.js");
var defaultData = require("./server/data/sample.js");

// Listener
app.listen(PORT, function () {
    defaultQuiz(defaultData);
    setTimeout(function () {
        console.log("App listening on PORT: " + PORT);
    }, 500);
});
