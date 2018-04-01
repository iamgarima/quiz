import React from "react";
import PropTypes from "prop-types";

const Question = props => (
  <div style={{ marginBottom: 30 }}>
    <h2>Q{props.quesNumber}. {props.text}</h2>
  </div>
);

Question.propTypes = {
    text: PropTypes.string.isRequired,
    quesNumber: PropTypes.number.isRequired
};

export default Question;
