import { connect } from "react-redux";

import Quiz from "../QuizContainer/Quiz/Quiz";
import { getQuestions } from "../../modules/questions";

const mapStateToProps = state => ({
    questions: state.questions
});

const mapDispatchToProps = dispatch => ({
    getQuestions: n => {
        dispatch(getQuestions(n));
    },
    addMarkedAnswers: markedAnswers => {
        dispatch(markedAnswers);
    }
});

const QuizContainer = connect(mapStateToProps, mapDispatchToProps)(Quiz);

export default QuizContainer;
