import React from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const RadioAnswer = props => (
  <div>
    <RadioButtonGroup name="options" onChange={props.handleRadio}>
      {props.options.map(option => (
        <RadioButton value={option.id} label={option.text} />
            ))}
    </RadioButtonGroup>
  </div>
);

export default RadioAnswer;
