import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>WELCOME</h1>
                <h2>
                    Please
                    <Link to="/signup">Signup</Link>
                    or
                    <Link to="/login">Login</Link> 
                </h2>
            </div>
        )
    }
}

export default Home;