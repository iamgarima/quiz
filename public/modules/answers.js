import axios from "axios";

const ADD_ANSWERS = "ADD_ANSWERS";

const answerReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ANSWERS:
            return [...state, ...action.payload.answers];
        default:
            return state;
    }
};

export const getAnswers = qIdList => dispatch => {
    axios
        .post("quiz/solutions", { qIdList })
        .then(res => {
            dispatch({
                type: ADD_ANSWERS,
                payload: {
                    answers: res.data
                }
            });
        })
        .catch(err => {
            alert(err); // eslint-disable-line no-undef
        });
};

export default answerReducer;
