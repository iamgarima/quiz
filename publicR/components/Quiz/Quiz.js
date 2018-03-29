import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import { addMarkedAns } from "../../modules/currentUserDetails";
import { getQuestions } from "../../modules/questions";
import Question from "./Question/Question";
import Answer from "./Answer/RadioAnswer/RadioAnswer";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.userResponses = [];
        this.selected = {};
        this.handleRadio = this.handleRadio.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleUpdates = this.handleUpdates.bind(this);
    }

    componentDidMount() {
        this.props.addQuizType({
            type: "ADD_QUIZ_TYPE",
            payload: {
                quiz: "General Knowlegde"
            }
        });
        this.props.getQuestions(4);
    }

    handleUpdates() {
        let count = 0;
        this.selected.qId = this.props.questions[this.state.count].id;
        this.userResponses.forEach(userResponse => {
            if (userResponse.qId === this.selected.qId) {
                userResponse.markedAns = this.selected.markedAns;
                count += 1;
            }
        });
        console.log("this.userResponses", this.userResponses, this.selected);
        if (count === 0) {
            const obj = Object.assign({}, this.selected);
            this.userResponses.push(obj);
        }
    }

    handleRadio(e, value) {
        this.selected.markedAns = value;
    }

    handlePrevious() {
        this.handleUpdates();
        this.setState(prevState => ({
            count: prevState.count - 1
        }));
    }

    handleNext() {
        this.handleUpdates();
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    handleSubmit() {
        this.handleUpdates();
        this.props.updateUserResponseStorage(() => ({
            type: "ADD_MARKED_ANSWERS",
            payload: {
                currentMarkedAnswers: this.userResponses
            }
        }));
        this.props.history.push("/result");
    }

    requiredButtons() {
        if (this.state.count === 0) {
            return (
              <RaisedButton label="Next" primary onClick={this.handleNext} />
            );
        } else if (this.state.count === this.props.questions.length - 1) {
            return (
              <div>
                <RaisedButton
                  label="Submit"
                  primary
                  onClick={this.handleSubmit}
                />
                <RaisedButton
                  label="Previous"
                  primary
                  onClick={this.handlePrevious}
                />
              </div>
            );
        }
        return (
          <div>
            <RaisedButton
              label="Previous"
              primary
              onClick={this.handlePrevious}
            />
            <RaisedButton label="Next" primary onClick={this.handleNext} />
          </div>
        );
    }

    render() {
        if (this.props.questions.length === 0) {
            return (
              <div>
                <CircularProgress />
              </div>
            );
        }

        return (
          <div>
            <Question text={this.props.questions[this.state.count].text} />
            <Answer
              handleRadio={this.handleRadio}
              options={this.props.questions[this.state.count].options}
            />
            {this.requiredButtons()}
          </div>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.questions
});

const mapDispatchToProps = dispatch => ({
    getQuestions: n => {
        dispatch(getQuestions(n));
    },
    addMarkedAns: (qId, markedAnsId) => {
        dispatch(addMarkedAns(qId, markedAnsId));
    },
    updateUserResponseStorage: userResDispatch => {
        dispatch(userResDispatch());
    },
    addQuizType: quizTypeObj => {
        dispatch(quizTypeObj);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
