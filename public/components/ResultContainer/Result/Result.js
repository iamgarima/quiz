import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";
import Header from "../../Header/Header";
import "./Result.scss";

class Result extends Component {
    constructor(props) {
        super(props);
        this.score = 0;
    }

    componentDidMount() {
        const qIdList = this.props.questions.map(question => question.id);
        this.props.getAnswers(qIdList);
    }

    showResult() {
        this.props.user.markedAnswers.forEach(marked => {
            // eslint-disable-line
            this.props.answers.forEach(ans => {
                if (ans.qid === marked.qId) {
                    if (ans.ansid === marked.markedAns) {
                        this.score += 1;
                    }
                }
            });
        });
        return (
          <div className="result">
            {/* <h2> Hi {this.props.user.email},</h2> */}
            <h1>
                    YOUR SCORE IS{" "}
              <span>
                {this.score}/{this.props.answers.length}
              </span>
            </h1>
            <p>
                Want to take the quiz again?{" "}
                <span>
                    <i>
                        <a href="/">Click here</a>
                    </i>
                </span>
            </p>
          </div>
        );
    }

    render() {
        return (
          <div>
            <Header text="RESULT" />
            {this.props.answers.length === 0 ||
                this.props.user.markedAnswers.length === 0 ? (
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
            id: PropTypes.number.isRequired
        })
    ).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            qid: PropTypes.number.isRequired,
            ansid: PropTypes.number.isRequired
        })
    ).isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        markedAnswers: PropTypes.arrayOf(
            PropTypes.shape({
                qId: PropTypes.number.isRequired,
                markedAns: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired,
    getAnswers: PropTypes.func.isRequired
};

export default Result;
