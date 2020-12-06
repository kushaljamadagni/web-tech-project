// Include React
import React from "react";

class GetPA extends React.Component {

    render() {
        var t = this.props.answer;
        if (t.isCorrect)
            return (
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        value={this.props.index}
                        type="checkbox"
                        checked={t.wasSelected}
                    />
                    &nbsp; <font color="green"><b>{t.txt}</b></font>
                </div>
            );
        else if ((!t.isCorrect) && (t.wasSelected))
            return (
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        value={this.props.index}
                        type="checkbox"
                        checked={t.wasSelected}
                    />
                    &nbsp; <font color="red"><b><strike>{t.txt}</strike></b></font>
                </div>
            );
        else
            return (
                // 
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        value={this.props.index}
                        type="checkbox"
                        checked={t.wasSelected}
                    />
                    &nbsp; {t.txt}
                </div>
            );
    }
}

export default class ShowAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            answers: null,
            clickedList: []
        }
    }

    componentDidMount() {
        this.setState({
            answers: this.props.pAnswers,
        }, function () {
            this.setState({ isReady: true });
        });
    }

    render() {
        if (this.state.isReady) {
            return (
                <div>
                    <div>Subject: {this.state.answers.subject}</div>
                    {this.state.answers.length == 0 ?
                        (<div>Memorization: {this.state.answers.question.txt}</div>) :
                        (<div>Question:  {this.state.answers.question.txt}</div>)
                    }

                    {this.state.answers.propAnswers.map(oneAnswer => {
                        return <GetPA answer={oneAnswer} />;
                    })}
                </div>
            );
        }
        else
            return (<p></p>);
    }
}


