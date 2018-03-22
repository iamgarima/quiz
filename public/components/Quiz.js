import React, { Component } from 'react';
import data from '../actions';
class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            questions:  [{text: '', options:[{text: ''}, {text: ''}, {text: ''}, {text: ''}]}],
            count: 0,
            last: false,
            result: false
        };
        this.selected = {
            qId: this.state.questions[0].id,
            ansId: 0
        };
        this.userAnsList = [];
        this.ansList = [];
        this.score = 0;
    }

    incrementCount() {
        this.setState(prevState => {
            if(prevState.count !== this.state.questions.length - 1) {
                if(prevState.count === this.state.questions.length - 2 ) {
                    return {
                        count: prevState.count + 1,
                        last: true
                    };
                }
                return {count: prevState.count + 1};
            }
        })
        this.selected.qId = this.state.questions[this.state.count].id;
        let selected = Object.assign({}, this.selected);
        this.userAnsList.push(selected); // if you do this.userAnsList.push(this.selected) here then every element of the array
                                         // will point to the this.selected object as objects are passed through reference
    }

    radioHandler(e) {
        // this.selected.qId = e.target.id;
        this.selected.ansId = Number(e.target.value);
    }

    componentDidMount() {
        data.getQuestions(4).then(newQuestions => {
            this.setState(prevState => ({
                questions: newQuestions
            }))
        });
    }

    submitHandler() {
        this.incrementCount();
        let qIdList = [];
        this.userAnsList.forEach(selected => {
            qIdList.push(selected.qId);
        })
        data.getAnswers(qIdList).then(ansList => {
            this.ansList = ansList;
            ansList.forEach(ansObj => {
                this.userAnsList.forEach(userAns => {
                    if(userAns.qId == ansObj.qid) {
                        if(userAns.ansId === ansObj.ansid) {
                            this.score += 1;
                        }
                    }
                })
            })
            this.setState({
                result: true
            });
        })
    }

    render() {
        if(this.state.result) {
            return (
                <div>
                    <h1>Result</h1>
                    <h2>Your score is {this.score}/{this.userAnsList.length}</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{this.state.questions[this.state.count].text}</h2>
                    <div>
                        <input onChange={ e => this.radioHandler(e) } type="radio" id={this.state.questions[this.state.count].id} name="answer" value={this.state.questions[this.state.count].options[0].id}/>
                        <label for={this.state.questions[this.state.count].id}>{this.state.questions[this.state.count].options[0].text}</label>

                        <input onChange={ e => this.radioHandler(e) } type="radio" id={this.state.questions[this.state.count].id} name="answer" value={this.state.questions[this.state.count].options[1].id}/>
                        <label for={this.state.questions[this.state.count].id}>{this.state.questions[this.state.count].options[1].text}</label>

                        <input onChange={ e => this.radioHandler(e) } type="radio" id={this.state.questions[this.state.count].id} name="answer" value={this.state.questions[this.state.count].options[2].id}/>
                        <label for={this.state.questions[this.state.count].id}>{this.state.questions[this.state.count].options[2].text}</label>

                        <input onChange={ e => this.radioHandler(e) } type="radio" id={this.state.questions[this.state.count].id} name="answer"  value={this.state.questions[this.state.count].options[3].id}/>
                        <label for={this.state.questions[this.state.count].id}>{this.state.questions[this.state.count].options[3].text}</label>
                    </div>
                    {
                        this.state.last ? <button onClick={() => this.submitHandler()}>Submit</button> : <button onClick={() => this.incrementCount()}>Next</button>
                    }
                </div>
            )
        }
    }
}   


export default Quiz;