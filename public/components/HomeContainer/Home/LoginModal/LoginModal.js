import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import './LoginModal.scss';

const LoginModal = props => (
  <Dialog
    title="Login"
    actions={props.actions}
    modal
    open={props.open}
    className="login-dialog"
  >
    <TextField
      hintText="Email"
      floatingLabelText="Email*"
      type="email"
      onChange={props.onChangeEmail}
      className="login-email"
    //   style={{ width: 700 }}
    />
    <br />
    <TextField
      hintText="Password"
      floatingLabelText="Password*"
      type="password"
      onChange={props.onChangePassword}
    //   style={{ width: 700 }}
      className="login-password"
    />
  </Dialog>
);

LoginModal.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.element).isRequired,
    open: PropTypes.bool.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired
};

export default LoginModal;
