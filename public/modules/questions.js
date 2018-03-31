import axios from "axios";

const ADD_QUESTIONS = "ADD_QUESTIONS";

const questionReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_QUESTIONS:
            return [...state, ...action.payload.questions];
        default:
            return state;
    }
};

export const getQuestions = n => dispatch => {
    axios
        .post("/quiz/questions", { count: n })
        .then(res => {
            dispatch({
                type: ADD_QUESTIONS,
                payload: {
                    questions: res.data
                }
            });
        })
        .catch(err => {
            alert(err); // eslint-disable-line no-undef
        }); // how to write error messages
};

export default questionReducer;
