// Include React
import React from "react";

class GetPA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            txt: ""
        }
    }

    cbToggle(e) {
        this.setState({ isChecked: !this.state.isChecked }, function () {
            this.props.cb(this.props.pA.index, this.state.isChecked);
        });
    }

    txtHandler(e) {
        this.setState({ txt: e.target.value });
        this.props.pATEXT(this.props.pA.index, e.target.value);
    }

    render() {
        return (
            <div>&nbsp;&nbsp;&nbsp;
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={(e) => this.cbToggle(e)}
                />&nbsp;
                <input type="text" onChange={(e) => this.txtHandler(e)} maxLength={108} />
            </div>
        ); // en of return
    }
}

export default class GetQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPA: -1,
            // No more question to add ...
            isMoreQuestion: true,
            continue: true,

            qSubject: "",
            qQuestionTxt: "",
            qQuestionImg: "",
            qPA: []
        }
    }

    // add to the list of Quiz's question
    oneQuestionIsReady(e, isLast) {
        var ob = {};
        ob.subject = this.state.qSubject;
        ob.question = {
            txt: this.state.qQuestionTxt,
            img: this.state.qQuestionImg
        };
        ob.propAnswers = this.state.qPA;
        ob.refs = "";
        this.props.add1QA(ob, isLast);
    }

    qSubj(e) {
        this.setState({
            qSubject: e.target.value
        });
    }

    quesTxt(e) {
        this.setState({
            qQuestionTxt: e.target.value
        });
    }

    setOneCorrectPA(index, val) {
        let obj = this.state.qPA;
        obj[index].isCorrect = val;
        this.setState({ obj });
    }

    setPAText(index, val) {
        let obj = this.state.qPA;
        obj[index].txt = val;
        this.setState({ obj });
    }

    howManyPA(e) {
        this.setState({ numPA: e.target.value }, function () {
            this.buildPA();
        });
    }

    buildPA() {
        let l = this.state.qPA;
        for (let i = 0; i < this.state.numPA; i++) {
            let obj = {};
            obj.index = i;
            obj.txt = "";
            obj.img = "";
            obj.isCorrect = false;
            obj.wasSelected = false;
            l.push(obj);
        }
        this.setState({ l });
    }

    set4NextQuestion(e) {
        // First: Put the Question into the Quiz (no insertion into the DB yet)
        this.oneQuestionIsReady(e, false);
        // Second: Set everything the be ready for a new question
        this.setState({
            numPA: -1,
            qSubject: "",
            qQuestionTxt: "",
            qQuestionImg: "",
            qPA: [],
            // No more question to add ...
            isMoreQuestion: true,
            isPADone: false
        });
    }

    // Save new Quiz into the Database
    noMoreQuestion(e) {
        // Add the last question into the Quiz's question
        this.oneQuestionIsReady(e,true);
        this.setState({ isMoreQuestion: false });
    }

    render() {
        if (this.state.isMoreQuestion) {
            if (this.state.numPA < 0) {
                return (
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={(e) => this.set4NextQuestion(e)}>More Question?</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary btn-lg" onClick={(e) => this.noMoreQuestion(e)}>Done</button>
                        <br/>
                        <label>Question's Subject:</label>
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" onChange={(e) => this.qSubj(e)} ref="qS" maxLength={108} />

                        <br /><br />
                        <label>Question: </label>
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" onChange={(e) => this.quesTxt(e)} ref="ques" maxLength={108} />

                        <br /><br />
                        <label>Number of Proposed Answers (0: Memorization, 1: Flashcard, more: MCQ):</label>
                        <br />&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>
                            <select onChange={(e) => this.howManyPA(e)} ref="refNumPa" >
                                <option value={0} >&nbsp;&nbsp;0 (Memorization)&nbsp;</option>
                                <option value={1} >&nbsp;&nbsp;1 (Flashcard)&nbsp;</option>
                                <option value={2} >&nbsp;&nbsp;2&nbsp;</option>
                                <option value={3} >&nbsp;&nbsp;3&nbsp;</option>
                                <option value={4} >&nbsp;&nbsp;4&nbsp;</option>
                                <option value={5} >&nbsp;&nbsp;5&nbsp;</option>
                                <option value={6} >&nbsp;&nbsp;6&nbsp;</option>
                                <option value={7} >&nbsp;&nbsp;7&nbsp;</option>
                                <option value={8} >&nbsp;&nbsp;8&nbsp;</option>
                                <option value={9} >&nbsp;&nbsp;9&nbsp;</option>
                                <option value={10} >&nbsp;10&nbsp;</option>
                                <option value={11} >&nbsp;11&nbsp;</option>
                                <option value={12} >&nbsp;12&nbsp;</option>
                                <option value={13} >&nbsp;13&nbsp;</option>
                                <option value={14} >&nbsp;14&nbsp;</option>
                                <option value={15} >&nbsp;15&nbsp;</option>
                            </select>
                        </div>
                        <br />
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={(e) => this.set4NextQuestion(e)}>More Question?</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary btn-lg" onClick={(e) => this.noMoreQuestion(e)}>Done</button>
                        <br/>
                        <span><b><u>Question:</u></b> "{this.state.qQuestionTxt}"</span>
                        <br/>&nbsp;&nbsp;&nbsp;
                        {this.state.qPA.map((obj) => {
                            return <GetPA
                                pA={obj}
                                key={obj.index}
                                cb={(index, value) => this.setOneCorrectPA(index, value)}
                                pATEXT={(e, val) => this.setPAText(e, val)}
                            />
                        })}
                    </div>
                );
            }
        }
        else {
            return (
                <div></div>
            );
        }
    }
}