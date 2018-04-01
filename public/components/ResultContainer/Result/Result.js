import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";

class Result extends Component {
    constructor(props) {
        super(props);
        this.score = 0;
    }

    componentDidMount() {
        const qIdList = this.props.questions.map(question => question.id);
        console.log("fi", qIdList);
        this.props.getAnswers(qIdList);
    }

    showResult() {
        this.props.user.markedAnswers.forEach(marked => {  // eslint-disable-line
            this.props.answers.forEach(ans => {
                if (ans.qid === marked.qId) {
                    if (ans.ansid === marked.markedAns) {
                        this.score += 1;
                    }
                }
            });
        });
        return (
          <h2>
                Your score is {this.score}/{this.props.answers.length}
          </h2>
        );
    }

    render() {
        return (
          <div>
            <h1>Result</h1>
            {this.props.answers.length === 0 ? (
              <CircularProgress />
                ) : (
                    this.showResult()
                )}
          </div>
        );
    }
}

Result.propTypes = {
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
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            qid: PropTypes.number.isRequired,
            ansid: PropTypes.number.isRequired
        })
    ).isRequired,
    user: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
            isLoggedIn: PropTypes.oneOf([null, true, false]).isRequired,
            markedAnswers: PropTypes.arrayOf(
                PropTypes.shape({
                    qId: PropTypes.number.isRequired,
                    markedAns: PropTypes.number.isRequired
                })
            ).isRequired
        })
    ).isRequired,
    getAnswers: PropTypes.func.isRequired
};

export default Result;
