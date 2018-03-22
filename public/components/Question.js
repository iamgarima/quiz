import React from 'react';

const Question = props => {
    return (
        <div>
            <h2>{this.props.question.text}</h2>
            <div>
                <input type="radio" id="choice1" name="answer" value={this.props.question.options[0]}/>
                <label for="choice1">{this.props.options[0]}</label>

                <input type="radio" id="choice2" name="answer" value={this.props.question.options[1]}/>
                <label for="choice2">{this.props.options[1]}</label>

                <input type="radio" id="choice3" name="answer" value={this.props.question.options[2]}/>
                <label for="choice3">{this.props.options[2]}</label>

                <input type="radio" id="choice4" name="answer" value={this.props.question.options[3]}/>
                <label for="choice4">{this.props.options[3]}</label>
            </div>
            {
                this.props.last ? <button>Submit</button> : <button>Next</button>
            }
        </div>
    );
}