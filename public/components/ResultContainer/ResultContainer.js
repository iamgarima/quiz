import { connect } from "react-redux";

import Result from "./Result/Result";
import { getAnswers } from "../../modules/answers";

const mapStateToProps = state => ({
    questions: state.questions,
    answers: state.answers,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getAnswers: qIdList => {
        dispatch(getAnswers(qIdList));
    }
});

const ResultContainer = connect(mapStateToProps, mapDispatchToProps)(Result);

export default ResultContainer;
