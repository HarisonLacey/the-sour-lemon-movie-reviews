import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Redirect from "./views/Redirect";
import Item from "./views/Item";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/redirect" component={Redirect} exact />
      <Route path="/movie" component={Item} exact />
    </Switch>
  );
}

export default App;
