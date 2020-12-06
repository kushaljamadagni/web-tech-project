import React from "react";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import Main from "../components/Main";

import QuizAdd from "../components/quiz_add";
import QuizPlay from "../components/quiz_play";
// to show "question" and "proposed answers"
import QuizPlayQuestion from "../components/quiz_play_parts/showQuestion";
// to show answers after checking process ...
import QuizPlayAnswers from "../components/quiz_play_parts/showAnswers";
import QuizHome from "../components/Quiz_home";

// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      {/* If user selects Child1 then show the appropriate component*/}
      <Route path="quiz_add" component={QuizAdd} />

      {/* If user selects Child2 then show the appropriate component*/}
      <Route path="quiz_play" component={QuizPlay} />

      {/* If user selects any other path... we get the Home Route */}
      <IndexRoute component={QuizHome} />

    </Route>
  </Router>
);
