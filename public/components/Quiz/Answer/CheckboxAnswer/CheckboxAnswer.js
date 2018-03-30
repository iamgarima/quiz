import React from "react";

const CheckboxAnswer = props => (
  <div>
    {props.options.map(option => (
      <div>
        <input type="checkbox" value={option.id} />
        <label>{option.text}</label>
      </div>
        ))}
  </div>
);

export default CheckboxAnswer;
