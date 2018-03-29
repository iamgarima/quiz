import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "../../store";
import history from "../../history";
import Home from "../Home/Home";
import Quiz from "../Quiz/Quiz";
import Result from "../Result/Result";

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/result" component={Result} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
