import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";

const Header = props => (
  <div className="header">
    <h1>{props.text}</h1>
  </div>
);

Header.propTypes = {
    text: PropTypes.string.isRequired
};

export default Header;
