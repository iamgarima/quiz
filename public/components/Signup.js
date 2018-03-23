import React, { Component } from 'react';
import data from '../actions';


class Signup extends Component {
    constructor() {
        super();
    }

    handleSignup() {
        data.addUser(this.email.value, this.password.value)
        .then(val => {
            this.props.history.push('/quiz');
        });
        this.email.value = '';
        this.password.value = '';
    }

    render() {
        return (
            <div>
                <input type="email" placeholder="Enter email id" ref={input => this.email = input} />
                <input type="password" placeholder="Enter password" ref={input => this.password = input}/>
                <button onClick={() => this.handleSignup()}>Sign up</button> 
            </div>
        );
    }
}

export default Signup;