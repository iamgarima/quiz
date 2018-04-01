import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";

const SignupModal = props => (
  <Dialog title="Signup" actions={props.actions} modal open={props.open}>
    <TextField
      hintText="Email"
      floatingLabelText="Email*"
      type="email"
      onChange={props.onChangeEmail}
      style={{ width: 700 }}
    />
    <br />
    <TextField
      hintText="Password"
      floatingLabelText="Password*"
      type="password"
      onChange={props.onChangePassword}
      style={{ width: 335 }}
    />
    <TextField
      hintText="Re-enter Password"
      floatingLabelText="Re-enter Password*"
      type="password"
      onChange={props.onChangeRePassword}
      style={{ width: 335, marginLeft: 30 }}
    />
  </Dialog>
);

SignupModal.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.element).isRequired,
    open: PropTypes.bool.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangeRePassword: PropTypes.func.isRequired
};

export default SignupModal;
