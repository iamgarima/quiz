import React from "react";
import PropTypes from "prop-types";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const RadioAnswer = props => (
  <div>
    <RadioButtonGroup name="options" onChange={props.handleRadio}>
      {props.options.map(option => (
        <RadioButton
          value={option.id}
          label={option.text}
          style={{ marginTop: 5 }}
        />
            ))}
    </RadioButtonGroup>
  </div>
);

RadioAnswer.propTypes = {
    handleRadio: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired
};

export default RadioAnswer;
