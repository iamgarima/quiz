import React, { Component } from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import SignupModal from "./SignupModal/SignupModal";
import LoginModal from "./LoginModal/LoginModal";
import Header from "../../Header/Header";
import {
    validateEmail,
    validatePassword
} from "../../../../src/helpers/validations";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSignup: false,
            openLogin: false
        };
        this.disableSubmit = false;
        this.handleClose = this.handleClose.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleSignupEmail = this.handleSignupEmail.bind(this);
        this.handleSignupPassword = this.handleSignupPassword.bind(this);
        this.handleLoginEmail = this.handleLoginEmail.bind(this);
        this.handleLoginPassword = this.handleLoginPassword.bind(this);
    }

    componentWillMount() {
        this.props.isUserLoggedIn();
    }

    handleClose() {
        this.setState({ openSignup: false, openLogin: false });
    }

    handleSignupSubmit() {
        if (!validateEmail(this.signupEmail)) {
            alert("Please enter valid email."); // eslint-disable-line no-undef
        } else if (!validatePassword(this.signupPassword)) {
            alert(                                                      // eslint-disable-line no-undef
                "Password should be minimum 6 digits long and should not include spaces."
            );
        } else {
            this.disableSubmit = true;
            this.props.addUser(this.signupEmail, this.signupPassword);
        }
    }

    handleLoginSubmit() {
        if (!validateEmail(this.loginEmail)) {
            alert("Please enter valid email."); // eslint-disable-line no-undef
        } else if (!validatePassword(this.loginPassword)) {
            alert(                                              // eslint-disable-line no-undef                      
                "Password should be minimum 6 digits long and should not include spaces."
            );
        } else {
            this.disableSubmit = true;
            this.props.loginUser(this.loginEmail, this.loginPassword);
        }
    }

    handleSignup() {
        this.setState({ openSignup: true });
    }

    handleLogin() {
        this.setState({ openLogin: true });
    }

    handleSignupEmail(e, value) {
        this.signupEmail = value.trim();
    }

    handleSignupPassword(e, value) {
        this.signupPassword = value.trim();
    }

    handleLoginEmail(e, value) {
        this.loginEmail = value.trim();
    }

    handleLoginPassword(e, value) {
        this.loginPassword = value.trim();
    }

    render() {
        const actions = [
          <FlatButton label="Cancel" primary onClick={this.handleClose} />,
          <FlatButton
            label={this.state.openSignup ? "Signup" : "Login"}
            primary
            disabled={this.disableSubmit}
            onClick={
                    this.state.openSignup
                        ? this.handleSignupSubmit
                        : this.handleLoginSubmit
                }
          />
        ];

        if (this.props.user.isLoggedIn === false) {
            return (
              <div>
                <Header text="QUIZ" />
                <RaisedButton
                  label="Signup"
                  primary
                  onClick={this.handleSignup}
                />
                <SignupModal
                  actions={actions}
                  open={this.state.openSignup}
                  onChangeEmail={this.handleSignupEmail}
                  onChangePassword={this.handleSignupPassword}
                />
                <p>or</p>
                <RaisedButton
                  label="Login"
                  primary
                  onClick={this.handleLogin}
                />
                <LoginModal
                  actions={actions}
                  open={this.state.openLogin}
                  onChangeEmail={this.handleLoginEmail}
                  onChangePassword={this.handleLoginPassword}
                />
              </div>
            );
        }
        return (
          <div>
            <CircularProgress />
          </div>
        );
    }
}

Home.propTypes = {
    isUserLoggedIn: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
        isLoggedIn: PropTypes.oneOf([null, true, false])
    }).isRequired
};

export default Home;
