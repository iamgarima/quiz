import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <div>
    <h1>{props.text}</h1>
  </div>
);

Header.propTypes = {
    text: PropTypes.string.isRequired
};

export default Header;
