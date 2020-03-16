import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// App components
import SearchForm from "./SearchForm";
import PathNotFound from "./PathNotFound";
import Results from "./PhotoContainer";
import Loading from "./Loading";

// css
import "../App.css";

const App = props => {
  return (
    <Consumer>
      {({
        actions,
        defaultSearchTopics,
        loading,
        searchText,
        photos,
        photos_coffee,
        photos_dogs,
        photos_fall
      }) => {
        let ps = actions.performSearch;

        // get a random search term to show when page loads
        let randomSearch = defaultSearchTopics[Math.floor(Math.random() * 3)];
        // let loadingMsg = loading ? "Loading ..." : "";
        let loadingMsg = loading ? <Loading /> : "";
        return (
          <BrowserRouter>
            <div className="container">
              <SearchForm onSearch={ps} />
              {loadingMsg}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={`/search/${randomSearch}`} />}
                />

                <Route
                  exact
                  path="/search"
                  render={() => <Redirect to={`/search/${randomSearch}`} />}
                />

                <Route
                  exact
                  path="/search/coffee"
                  render={() => {
                    return (
                      <Results
                        photos={photos_coffee}
                        searchText={defaultSearchTopics[0]}
                      />
                    );
                  }}
                />

                <Route
                  exact
                  path="/search/dogs"
                  render={() => {
                    return (
                      <Results
                        photos={photos_dogs}
                        searchText={defaultSearchTopics[1]}
                      />
                    );
                  }}
                />

                <Route
                  path="/search/fall"
                  render={() => {
                    return (
                      <Results
                        photos={photos_fall}
                        searchText={defaultSearchTopics[2]}
                      />
                    );
                  }}
                />

                <Route path="/search/:searchText">
                  <Results photos={photos} searchText={searchText} />
                </Route>

                <Route component={PathNotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        );
      }}
    </Consumer>
  );
};

export default App;
