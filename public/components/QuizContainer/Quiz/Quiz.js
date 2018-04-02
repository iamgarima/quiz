import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import Question from "./Question/Question";
import Answer from "./Answer/RadioAnswer/RadioAnswer";
import Header from "../../Header/Header";
import "./Quiz.scss";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.disableSubmit = false;
        this.userResponses = [];
        this.selected = {};
        this.handleRadio = this.handleRadio.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleUpdates = this.handleUpdates.bind(this);
    }

    componentDidMount() {
        this.props.getQuestions(4);
    }

    handleUpdates() {
        let count = 0;
        this.selected.qId = this.props.questions[this.state.count].id;
        /* eslint-disable no-param-reassign */
        this.userResponses.forEach(userResponse => {
            if (userResponse.qId === this.selected.qId) {
                userResponse.markedAns = this.selected.markedAns;
                count += 1;
            }
        });
        /* eslint-enable no-param-reassign */
        if (count === 0) {
            const obj = Object.assign({}, this.selected);
            this.userResponses.push(obj);
        }
        this.state.checked = false;
    }

    handleRadio(e, value) {
        this.selected.markedAns = value;
    }

    handlePrevious() {
        if (this.selected.markedAns) {
            this.handleUpdates();
            this.setState(prevState => ({
                count: prevState.count - 1
            }));
        } else {
            alert("Please select an option."); // eslint-disable-line no-undef
        }
    }

    handleNext() {
        if (this.selected.markedAns) {
            this.handleUpdates();
            this.setState(prevState => ({
                count: prevState.count + 1
            }));
        } else {
            alert("Please select an option."); // eslint-disable-line no-undef
        }
    }

    handleSubmit() {
        if (this.selected.markedAns) {
            this.disableSubmit = true;
            this.handleUpdates();
            this.props.addMarkedAnswers({
                type: "ADD_MARKED_ANSWERS",
                payload: {
                    user: {
                        markedAnswers: this.userResponses
                    }
                }
            });
            this.props.history.push("/result");
        } else {
            alert("Please select an option."); // eslint-disable-line no-undef
        }
    }

    requiredButtons() {
        if (this.state.count === 0) {
            return (
              <RaisedButton
                label="Next"
                primary
                onClick={this.handleNext}
                className="quiz-next-btn"
              />
            );
        } else if (this.state.count === this.props.questions.length - 1) {
            return (
              <div>
                <RaisedButton
                  label="Submit"
                  primary
                  disabled={this.disableSubmit}
                  onClick={this.handleSubmit}
                  className="quiz-submit-btn"
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
            <RaisedButton
              label="Next"
              primary
              onClick={this.handleNext}
              className="quiz-next-btn"
            />
          </div>
        );
    }

    render() {
        if (this.props.questions.length === 0) {
            return (
              <div className="loading">
                <CircularProgress />
              </div>
            );
        }

        return (
          <div>
            <Header text="YOU WILL DO IT" />
            <div className="quiz">
              <Question
                text={this.props.questions[this.state.count].text} 
                quesNumber={this.state.count + 1}
              />
              <Answer
                handleRadio={this.handleRadio}
                options={this.props.questions[this.state.count].options}
              />
              <div className="quiz-btn">{this.requiredButtons()}</div>
            </div>
          </div>
        );
    }
}

Quiz.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    text: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    getQuestions: PropTypes.func.isRequired,
    addMarkedAnswers: PropTypes.func.isRequired
};

export default Quiz;
