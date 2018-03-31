import axios from "axios";
import history from "../history";

const ADD_CURRENT_USER = "ADD_CURRENT_USER";

const INITIAL_STATE = {
    id: "",
    email: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CURRENT_USER:
            return {
                ...action.payload.currentUser
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
                type: ADD_CURRENT_USER,
                payload: {
                    currentUser: res.data
                }
            });
            history.push("/quiz");
        })
        .catch(err => {
            alert(err); // eslint-disable-line no-undef
        });
};

export default userReducer;
