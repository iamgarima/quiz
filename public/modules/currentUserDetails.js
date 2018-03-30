import axios from "axios";
import history from "../history";

const ADD_CURRENT_USER = "ADD_CURRENT_USER";
const ADD_QUIZ_TYPE = "ADD_QUIZ_TYPE";
const ADD_MARKED_ANSWERS = "ADD_MARKED_ANSWERS";
const ADD_SCORE = "ADD_SCORE";

const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CURRENT_USER:
            return {
                ...action.payload.currentUser
            };
        case ADD_QUIZ_TYPE:
            return {
                ...state,
                quiz: [
                    {
                        type: action.payload.quiz.type
                    }
                ]
            };
        case ADD_MARKED_ANSWERS:
            console.log("hsfsfhddkfdddj", action.payload.currentMarkedAnswers);
            return {
                ...state,
                currentMarkedAnswers: action.payload.currentMarkedAnswers
            };
        // {
        //     let count = 0;
        //     const updatedMarkedAnswers = state.quiz.markedAnswers.map(markedAns => {
        //         if(markedAns.qId === action.payload.markedAns.qId) {
        //             count += 1;
        //             return action.payload.markedAns;
        //         }
        //         return markedAns;
        //     })
        //     if(count === 0) {
        //         updatedMarkedAnswers.push(action.payload.markedAns)
        //     }
        //     return {
        //         ...state,
        //         currentMarkedAnswers: updatedMarkedAnswers
        //     };
        // }
        case ADD_SCORE: {
            const updatedQuiz = state.quiz.map(q => {
                if (q.type === action.payload.quiz.type) {
                    return {
                        ...q,
                        score: action.payload.quiz.score,
                        markedAnswers: state.currentMarkedAnswers
                    };
                }
                return q;
            });
            return {
                ...state,
                quiz: updatedQuiz
            };
        }
        default:
            return state;
    }
};

export const loginUser = (username, password) => dispatch => {
    axios
        .post("/login", {
            username,
            password
        })
        .then(res => {
            dispatch({
                type: ADD_CURRENT_USER,
                payload: {
                    currentUser: res.data
                }
            });
            history.push("/quiz");
        })
        .catch(err => {
            alert(err);
        });
};

export default currentUserReducer;
