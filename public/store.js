import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import userReducer from "./modules/user";
import questionReducer from "./modules/questions";
import answerReducer from "./modules/answers";

const reducer = combineReducers({
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer
});

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
export default store;
