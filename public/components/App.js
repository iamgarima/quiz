import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Signup from './Signup';
import Login from './Login';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/quiz" component={Quiz} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />  
            </div>     
        </BrowserRouter>
    )
}

export default App;