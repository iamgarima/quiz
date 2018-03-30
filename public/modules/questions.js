import axios from "axios";

const ADD_QUESTIONS = "ADD_QUESTIONS";
const ADD_QUESTION = "ADD_QUESTION";
const UPDATE_QUESTION_TEXT = "UPDATE_QUESTION_TEXT";
const UPDATE_QUESTION_OPTIONS = "UPDATE_QUESTION_OPTIONS";
const DELETE_QUESTION = "DELETE_QUESTION";

const questionReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_QUESTIONS:
            return [...state, ...action.payload.questions];
        case ADD_QUESTION:
            return [...state, action.payload.question];
        case UPDATE_QUESTION_TEXT:
            return state.map(ques => {
                if (ques.id === action.payload.question.id) {
                    return {
                        id: ques.id,
                        text: action.payload.question.text,
                        options: ques.options
                    };
                }
                return ques;
            });
        case UPDATE_QUESTION_OPTIONS:
            return state.map(ques => {
                if (ques.id === action.payload.question.id) {
                    ques.options.map(option => {
                        let updatedOption;
                        action.payload.question.options.forEach(
                            payloadOption => {
                                if (option.id === payloadOption.id) {
                                    updatedOption = {
                                        id: option.id,
                                        text: payloadOption.text
                                    };
                                }
                            }
                        );
                        if (updatedOption) {
                            return updatedOption;
                        }
                        return option;
                    });
                }
                return ques;
            });
        case DELETE_QUESTION:
            return state.map(ques => {
                if (ques.id === action.payload.question.id) {
                    return;
                }
                return ques;
            });
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
            alert(err);
        }); // how to write error messages
};

export default questionReducer;
