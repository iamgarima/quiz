import { connect } from "react-redux";

import { loginUser, addUser, isUserLoggedIn } from "../../modules/user";
import Home from "./Home/Home";

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    addUser: (email, password) => {
        dispatch(addUser(email, password));
    },
    loginUser: (email, password) => {
        dispatch(loginUser(email, password));
    },
    isUserLoggedIn: () => {
        dispatch(isUserLoggedIn());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
