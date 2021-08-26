import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginForm from "./Components/Forms/loginForm";
import SignupForm from "./Components/Forms/signUpForm";
import Home from "./Components/Home/Home";

import { AuthContextProvider } from "./Context/AuthContext";

// PRIVATE ROUTE
import PrivateRoute from "./Routes/Private Routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
