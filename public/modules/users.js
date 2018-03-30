import axios from "axios";
import history from "../history";

const ADD_USER = "ADD_USER";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload.user];
        default:
            return state;
    }
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
            alert(err);
        });
};

export default userReducer;
