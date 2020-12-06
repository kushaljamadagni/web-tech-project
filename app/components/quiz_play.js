// Include React
import React from "react";
import router from "react-router";
import Quiz from "../shared/data";

// to show "question" and "proposed answers"
import ShowQuestion from "./quiz_play_parts/showQuestion";
// to show "answers"" after the checking process ...
import ShowAnswers from "./quiz_play_parts/showAnswers";

export default class QuizPlay extends React.Component {
    constructor(props) {
        super(props);

        this.btn_play_handler = this.btn_play_handler.bind(this);
        this.state = {
            isReady: false,
            quizName: "",
            quizSubject: "",
            q_a: [],

            isQuestionDisplaying: true,
            questionNum: 0,
            nextQuestionNum: 0,
            // Memorization is the only "question" with no need of answer
            // wasMemo: false,
            randListQues: [],
        };
    }

    // No display (directly) is the setting here (but it would be indirectly)
    setPlay(e) {
        // to be sure that we have at least a question
        if (this.state.q_a.length) {
            if (this.state.isQuestionDisplaying) {
                if (this.state.questionNum == this.state.nextQuestionNum) { // not "memorization"
                    this.setState({
                        isQuestionDisplaying: !this.state.isQuestionDisplaying
                    });
                }
                else { // memorization
                    this.setState({
                        //nextQuestionNum: ((this.state.questionNum + 1) % (this.state.randListQues.length))
                    });
                }
            }
            else { // answers are displying, it will be the next question to be displayed
                var num = ((this.state.questionNum + 1) % (this.state.randListQues.length));
                this.setState({
                    questionNum: num,
                    nextQuestionNum: num,
                    isQuestionDisplaying: !this.state.isQuestionDisplaying
                });
            }
        }
    }

    componentDidMount() {
        var newQuiz = new Quiz();
        // Process only when we get the raw data (of a quiz) from the database via the server
        newQuiz.getQuiz().then(res => {
            let wholeQuiz = res.data[0];
            this.setState({
                quizName: wholeQuiz.name,
                quizSubject: wholeQuiz.subject
            });
            let oneQuestion_quiz = wholeQuiz.q_a;
            let q_a_temp = [];
            // for each question
            for (let i = 0; i < oneQuestion_quiz.length; i++) {
                let oneQuestion = {};
                oneQuestion.subject = oneQuestion_quiz[i].subject;
                oneQuestion.refs = oneQuestion_quiz[i].refs;
                oneQuestion.question = {
                    txt: oneQuestion_quiz[i].question.txt,
                    img: oneQuestion_quiz[i].question.img
                }
                oneQuestion.propAnswers = [];
                let pAnswers = oneQuestion_quiz[i].propAnswers;
                // get every proposed answer
                for (let j = 0; j < pAnswers.length; j++) {
                    let o = {};
                    o.txt = pAnswers[j].txt;
                    o.img = pAnswers[j].img;
                    o.isCorrect = pAnswers[j].isCorrect;
                    // when playing quiz
                    o.wasSelected = false;

                    oneQuestion.propAnswers.push(o);
                }
                // add one more question (and proposed answers, correct answers, etc.)
                q_a_temp.push(oneQuestion);
            }
            this.setState({
                q_a: q_a_temp,
                randListQues: this.setRandQuesList(q_a_temp.length)
            }, function () {
                this.setState({ isReady: true });
            });
        });
    }

    setRandQuesList(length) {
        let returnList = [];
        let tempList = [];
        for (let i = 0; i < length; i++)
            tempList.push(false);
        for (let j = 0; j < length; j++) {
            let count = 0;
            let num = Math.floor(Math.random() * length);
            while (count < length) {
                if (!tempList[num % length]) {
                    tempList[num % length] = true;
                    returnList.push(num % length);
                    break;
                }
                num++;
                count++
            }
        }
        return returnList;
    }

    btn_play_handler(e) {
        this.initSelect();
        this.setState({
            isQuestion2Show: !this.state.isQuestion2Show
        });
        this.setPlay();
    }

    // Data from the chosen answers
    getDataFromForm(data, position) {
        var newQ_a = _.extend({}, this.state.q_a[position].propAnswers);
        newQ_a = data;
        this.setState({
            newQ_a,
            isQuestion2Show: false
        });
    }

    initSelect() {
        var pAChoice = this.state.q_a[this.state.randListQues[this.state.questionNum]];
        pAChoice.propAnswers.map((a) => {
            a.wasSelected = false
        });
        // show the new question
        this.setState({
            questionNum: this.state.lastQuestionNum
        });
    }

    pASelection(e) {
        var pAChoice = this.state.q_a[this.state.randListQues[this.state.questionNum]];
        pAChoice.propAnswers[e.target.value].wasSelected = !pAChoice.propAnswers[e.target.value].wasSelected;
        this.setState({
            pAChoice
        });
    }

    uiQuestion() {
        return (
            <div className="container">

                <div className="jumbotron">
                    <button className="btn btn-primary btn-lg" onClick={(ind) => this.setPlay(ind)}>Play</button>
                    <br />
                    <ShowQuestion
                        qAnswers={this.state.q_a[this.state.randListQues[this.state.questionNum]]}
                        position={this.state.randListQues[this.state.questionNum]}
                        cb={(e) => this.pASelection(e)}
                        readiness={this.setIsReady} />
                </div>
            </div>
        );
    }

    uiAnswer() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <button className="btn btn-primary btn-lg" onClick={(e) => this.setPlay(e)}>Play</button>
                    <br />
                    {/*Passive way: recieve data from parent then display*/}
                    <ShowAnswers pAnswers={this.state.q_a[this.state.randListQues[this.state.questionNum]]}
                        readiness={this.setIsReady} />
                </div>
            </div>
        );
    }

    render() {
        if (this.state.isReady) {
            if (this.state.questionNum != this.state.nextQuestionNum) {
                return (<div> {this.uiQuestion()} </div>);
            }
            else {
                if (this.state.isQuestionDisplaying) {
                    return (<div> {this.uiQuestion()} </div>);
                }
                else {
                    return (<div> {this.uiAnswer()} </div>);
                }
            }
        }
        else
            return (<div></div>);
    }
}
