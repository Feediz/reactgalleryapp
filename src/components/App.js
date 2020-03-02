import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// App components
import Main from "./Main";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/search/:searchTerm" component={Main} />
      <Route exact path="/" component={Main} />
    </Switch>
  </BrowserRouter>
);

export default App;
