import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import "./Header.scss";

const Header = props => (
  <div className="header">
    <h1 className={props.logout ? null : "head"}>{props.text}</h1>
    {props.logout ? (
      <FlatButton href="/logout" label="Logout" className="logout" />
        ) : (
          <span />
        )}
  </div>
);

Header.propTypes = {
    text: PropTypes.string.isRequired,
    logout: PropTypes.bool.isRequired
};

export default Header;
