import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";

const CheckboxAnswer = props => (
  <div>{props.options.map(option => <Checkbox label={option.text} />)}</div>
);

CheckboxAnswer.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired
};

export default CheckboxAnswer;
