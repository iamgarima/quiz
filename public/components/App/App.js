import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import store from "../../store";
import history from "../../history";
import HomeContainer from "../HomeContainer/HomeContainer";
import QuizContainer from "../QuizContainer/QuizContainer";
import ResultContainer from "../ResultContainer/ResultContainer";

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/quiz" component={QuizContainer} />
          <Route path="/result" component={ResultContainer} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
