import React, { Component } from 'react';
import data from '../actions';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleLogin() {
        data.checkUser(this.email.value, this.password.value)
            .then(isValid => {
                if(isValid) {
                    this.props.history.push('/quiz');
                }
            });
        this.email.value = '';
        this.password.value = '';
    }

    render() {
        return (
            <div>
                <input type="email" placeholder="Enter email id" ref={input => this.email = input} />
                <input type="password" placeholder="Enter password" ref={input => this.password = input}/>
                <button onClick={() => this.handleLogin()}>Login</button> 
            </div>
        );
    }
}

export default Login;