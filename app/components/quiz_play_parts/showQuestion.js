// Include React
import React from "react";

class GetPA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }

    componentDidMount() {
        this.setState({
            isChecked: this.props.pA.wasSelected
        });
    }

    toggleCheckbox(e) {
        this.setState({ isChecked: !this.state.isChecked });
        this.props.callback(e);
    }

    render() {
        var t = this.props.pA;
        return (
            <div>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                    value={this.props.key}
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={(e) => this.toggleCheckbox(e)} />
                <span>&nbsp; {t.txt}</span>
            </div>
        );
    }
}

export default class ShowQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            oneQ: {},
            clickedList: []
        }
    }

    componentDidMount() {
        this.setState({
            oneQ: this.props.qAnswers,
        }, function () {
            this.setState({ isReady:true });
        });
    }

    cbHandler(e) {
        this.props.cb(e);

    }

    render() {
        if (this.state.isReady) {
            return (
                <div>
                    <div>Subject: {this.state.oneQ.subject}</div>
                    {this.state.oneQ.propAnswers.length == 0 ?
                        (<div>Memorization: {this.state.oneQ.question.txt}</div>) :
                        (<div>Question:  {this.state.oneQ.question.txt}</div>)
                    }

                    {this.state.oneQ.propAnswers.map((val, index) => {
                        return <GetPA pA={val} key={index} callback={(e) => this.cbHandler(e)} />
                    })}
                </div>
            );
        }
        else
            return (<div></div>);
    }
}
