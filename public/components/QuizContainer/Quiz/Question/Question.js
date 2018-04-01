import React from "react";
import PropTypes from "prop-types";

const Question = props => (
  <div>
    <h2>{props.text}</h2>
  </div>
);

Question.propTypes = {
    text: PropTypes.string.isRequired
};

export default Question;
