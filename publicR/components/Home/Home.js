import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { addUser } from "../../modules/users";
import { loginUser } from "../../modules/currentUserDetails";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSignup: false,
            openLogin: false
        };
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

    handleClose() {
        this.setState({ openSignup: false, openLogin: false });
    }

    handleSignupSubmit() {
        this.props.addUser(this.signupEmail, this.signupPassword);
    }

    handleLoginSubmit() {
        this.props.loginUser(this.loginEmail, this.loginPassword);
    }

    handleSignup() {
        this.setState({ openSignup: true });
    }

    handleLogin() {
        this.setState({ openLogin: true });
    }

    handleSignupEmail(e, value) {
        this.signupEmail = value;
    }

    handleSignupPassword(e, value) {
        this.signupPassword = value;
    }

    handleLoginEmail(e, value) {
        this.loginEmail = value;
    }

    handleLoginPassword(e, value) {
        this.loginPassword = value;
    }

    render() {
        const actions = [
          <FlatButton label="Cancel" primary onClick={this.handleClose} />,
          <FlatButton
            label={this.state.openSignup ? "Signup" : "Login"}
            primary
                // disabled={true}
            onClick={
                    this.state.openSignup
                        ? this.handleSignupSubmit
                        : this.handleLoginSubmit
                }
          />
        ];

        return (
          <div>
            <h1>Quiz</h1>
            <RaisedButton
              label="Signup"
              primary
              onClick={this.handleSignup}
            />
            <Dialog
              title="Signup"
              actions={actions}
              modal
              open={this.state.openSignup}
            >
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                type="email"
                onChange={this.handleSignupEmail}
                required
              />
              <br />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                onChange={this.handleSignupPassword}
                required
              />
            </Dialog>
            <p>or</p>
            <RaisedButton
              label="Login"
              primary
              onClick={this.handleLogin}
            />
            <Dialog
              title="Login"
              actions={actions}
              modal
              open={this.state.openLogin}
            >
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                type="email"
                onChange={this.handleLoginEmail}
                required
              />
              <br />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                onChange={this.handleLoginPassword}
                required
              />
            </Dialog>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addUser: (email, password) => {
        dispatch(addUser(email, password));
    },
    loginUser: (email, password) => {
        dispatch(loginUser(email, password));
    }
});

export default connect(null, mapDispatchToProps)(Home);
// export default Home;
