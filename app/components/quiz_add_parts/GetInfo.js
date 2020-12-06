// Include React
import React from "react";

export default class GetInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            subject: ""
        };
    }

    txtName(e) {
        this.setState({
            name: e.target.value
        });
    }

    txtSubject(e) {
        this.setState({
            subject: e.target.value
        });        
    }

    btn_done(e) {
        this.refs.subj.value = "";
        this.refs.name.value = "";
        this.props.setQName(this.state.name);
        this.props.setQSubject(this.state.subject);
        this.props.quizInfoDone();
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-lg" onClick={(e) => this.btn_done(e)}>Next</button>
                <br /><br />
                <label>
                    Quiz's Name:
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" onChange={(e) => this.txtName(e)} ref="name" maxLength = {108} />
                </label>
                <br /><br />
                <label>
                    Quiz's Subject (Mathematics, History, etc.):
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" onChange={(e) => this.txtSubject(e)} ref="subj" maxLength = {108} />
                </label>
                <br />

            </div>
        );
    }
}