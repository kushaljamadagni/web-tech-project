// Include React
import React from "react";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  // Here we render the function
  render() {

    return (

      <div className="container">
        <br/>
        <div className="quiz_main_header">
          <h2><strong>Learn More With Quizzes of PES</strong></h2>
          <hr />
          <p>
            <a href="#/" className="btn btn-primary btn-lg">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#/quiz_add" className="btn btn-primary btn-lg">Add New Quiz</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#/quiz_play" className="btn btn-primary btn-lg">Play Quiz</a>
          </p>
        </div>
        <div className="row">
        <br/>
          {/* This code will dump the correct Child Component */}
          {this.props.children}

        </div>

      </div>
    );
  }
}