import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// App components
import SearchForm from "./SearchForm";
import Results from "./Results";

// css
import "../App.css";

const Main = props => {
  return (
    <Consumer>
      {(actions, defaultSearchTopics, searchText, photos, photos_tigers, photos_sunset) => {
        console.log("DEFAULT");
        console.log(defaultSearchTopics);
        let ps = actions.performSearch;
        let randomSearch = ["tigers", "sunset", "python"][Math.floor(Math.random() * 3)];
        // console.log("RANDOM: " + randomSearch);
        return (
          <BrowserRouter>
            <div className="container">
              <SearchForm onSearch={ps} />
              <Switch>
                <Route
                  exact
                  path="/search/tigers"
                  render={() => {
                    return (
                      <Results photos={photos_tigers} searchText="tigers" />
                    );
                  }}
                />

                <Route
                  exact
                  path="/search/sunset"
                  render={() => {
                    return (
                      <Results photos={photos_sunset} searchText="sunset" />
                    );
                  }}
                />

                <Route path="/search/:searchText">
                  <Results photos={photos} searchText={searchText} />
                </Route>
                
                <Route path="/" render={() => <Redirect to={`/search/${randomSearch}`} />} />
              </Switch>
            </div>
          </BrowserRouter>
        );
      }}
    </Consumer>
  );
};

export default Main;
