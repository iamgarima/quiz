import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import { getAnswers } from "../../modules/answers";

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
        console.log(
            "currentmarkedans",
            this.props.currentUserDetails.currentMarkedAnswers
        );
        this.props.currentUserDetails.currentMarkedAnswers.forEach(marked => {
            this.props.answers.forEach(ans => {
                if (ans.qid === marked.qId) {
                    if (ans.ansid === marked.markedAns) {
                        this.score += 1;
                    }
                }
            });
        });
        // this.props.addScore({
        //     type: 'ADD_SCORE',
        //     payload: {
        //         quiz: {
        //             type: 'General Knowledge',
        //             score: this.score
        //         }
        //     }
        // })
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

const mapStateToProps = state => ({
    questions: state.questions,
    answers: state.answers,
    currentUserDetails: state.currentUserDetails
});

const mapDispatchToProps = dispatch => ({
    getAnswers: qIdList => {
        dispatch(getAnswers(qIdList));
    },
    addScore: scoreObj => {
        dispatch(scoreObj);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
