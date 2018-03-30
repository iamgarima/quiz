import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import userReducer from "./modules/users";
import questionReducer from "./modules/questions";
import answerReducer from "./modules/answers";
import currentUserReducer from "./modules/currentUserDetails";

const reducer = combineReducers({
    users: userReducer,
    questions: questionReducer,
    answers: answerReducer,
    currentUserDetails: currentUserReducer
});

console.log(reducer);

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

console.log("store", store.getState());
export default store;
