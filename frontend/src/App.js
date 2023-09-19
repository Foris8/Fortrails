import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpForm from "./components/SignUpForm";
import MainPage from "./components/MainPage";
import ExplorePage from "./components/ExplorePage";




function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginFormPage} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/explore" component={ExplorePage} />
      </Switch>
    </>
  );
}

export default App;
