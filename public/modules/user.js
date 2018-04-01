import axios from "axios";
import history from "../history";

const ADD_USER = "ADD_USER";
const UPDATE_LOGIN_STATUS = "UPDATE_LOGIN_STATUS";
const ADD_MARKED_ANSWERS = "ADD_MARKED_ANSWERS";

const INITIAL_STATE = {
    id: 0,
    email: "",
    isLoggenIn: null,
    markedAnswers: []
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...action.payload.user
            };
        case UPDATE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload.user.isLoggedIn
            };
        case ADD_MARKED_ANSWERS:
            return {
                ...state,
                markedAnswers: action.payload.user.markedAnswers
            };
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
                type: ADD_USER,
                payload: {
                    user: res.data
                }
            });
            history.push("/quiz");
        })
        .catch(err => {
            alert(err); // eslint-disable-line no-undef
        });
};

export const addUser = (username, password) => dispatch => {
    axios
        .post("/signup", {
            username,
            password
        })
        .then(res => {
            dispatch({
                type: ADD_USER,
                payload: {
                    user: res.data
                }
            });
            history.push("/quiz");
        })
        .catch(err => {
            alert(err); // eslint-disable-line no-undef
        });
};

export const isUserLoggedIn = () => dispatch => {
    axios
        .get("/user")
        .then(res => {
            console.log("isUserLoggedIn", res);
            history.push("/quiz");
        })
        .catch(err => {
            console.log("isUserLoggedIn", err);
            dispatch({
                type: UPDATE_LOGIN_STATUS,
                payload: {
                    user: {
                        isLoggedIn: false
                    }
                }
            });
        });
};

export default userReducer;
