// Include React
import React from "react";

import Quiz from "../shared/data";
import GetQuestion from "./quiz_add_parts/GetQuestion";
import GetQuizInfo from "./quiz_add_parts/GetInfo";

export default class QuizAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //    1 --> Get Quiz Info (Name & Subject)
            //    2 --> Get ONE question
            //         a. Get Question Info (Subject + Question + Number of Proposed Answers)
            //         b. Get Proposed Answers
            //    3 --> New Quiz is Saved! ==> Display "Home Page"
            displayPart: 1,
            nbPA: -1,
            isNoMoreQuestion: false,

            newQuiz: {}
        };
    }

    componentDidMount() {
        var obj = {};
        obj.name = "";
        obj.subject = "";
        obj.q_a = [];

        this.setState({ newQuiz: obj });
    }

    addQuizName(val) {
        var oName = this.state.newQuiz;
        oName.name = val;
        this.setState({ oName });
    }

    addQuizSubj(val) {
        var oSubj = this.state.newQuiz;
        oSubj.subject = val;
        this.setState({ oSubj });
    }

    quizInfoDone(e) {
        this.setState({ displayPart: 2 })
    }

    addOneQA(obj, isLast) {
        var l = this.state.newQuiz;
        l.q_a.push(obj);
        
       
        if (isLast)
            this.setState({ l }, function () {
                this.saveQuiz(new Object()); 
            });
        else
            this.setState({ l });
    }

    setDisplayPart(val) {
        this.setState({ displayPart: val });
        if (this.state.displayPart == 3)
            this.saveQuiz();
    }

    saveQuiz(e) {
        var quizTempo = this.state.newQuiz;
        // transformation the quiz into a "good" format (corresponding to "models" of MongoDB)
        var goodStruct = {}
        goodStruct.name = quizTempo.name;        
        goodStruct.subject = quizTempo.subject;

        var qa = [];
        var qa_unit = {};
        var obj = quizTempo.q_a;
        for(let i=0 ; i<obj.length ; i++){
            qa_unit.subject = obj[i].subject;
            qa_unit.question = {
                txt: obj[i].question.txt,
                img: obj[i].question.img
            }
            qa_unit.propAnswers = [];
            for(let j=0 ; j<obj[i].propAnswers.length ; j++){
                let o = {};
                o.txt = obj[i].propAnswers[j].txt;
                o.img = obj[i].propAnswers[j].img;
                o.isCorrect = obj[i].propAnswers[j].isCorrect;
                qa_unit.propAnswers.push(o);
            }
            qa_unit.refs = obj.refs;
            qa.push(qa_unit);
        }
        goodStruct.q_a = qa;        

        // With a "good structure", we could record data into the database
        var aQuiz = new Quiz();
        aQuiz.saveQuiz(goodStruct).then(res => {
            alert("The Quiz is Saved!");

            // clear everything in case we want to add another one
            var q = this.state.newQuiz;
            q.name = "";
            q.subject = "";
            q.q_a = [];
            this.setState({ q });
        });
    }

    render() {
        if (this.state.displayPart == 1) { // get Quiz info (name & subject)
            return (
                <div className="container">
                    <div className="jumbotron">
                        <GetQuizInfo
                            setQName={(val) => this.addQuizName(val)}
                            setQSubject={(val) => this.addQuizSubj(val)}
                            quizInfoDone={() => this.setDisplayPart(2)}
                        />
                    </div>
                </div>
            );
        }
        else if (this.state.displayPart == 2) {
            return (
                <div className="container">
                    <div className="jumbotron">
                        <GetQuestion
                            add1QA={(e, val) => this.addOneQA(e, val)}
                            saveQ={(e) => this.saveQuiz(e)}
                        />
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}