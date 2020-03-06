import React, { Component } from "react";
// import axios from "axios";
import { Consumer } from "./Context";

// App components
import SearchForm from "./SearchForm";

import "../App.css";
import Results from "./Results";
import { act } from "react-dom/test-utils";

let ps = null;
export default class Main extends Component {
  //TODO: can use this to set default photos to display
  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    this.setState({
      searchTerm
    });
    if (searchTerm !== undefined && searchTerm.length > 0) {
      this.forceUpdate(ps(searchTerm));
    }
  }
  render() {
    return (
      <Consumer>
        {({ actions, photos, searchTerm }) => {
          ps = actions.performSearch;
          return (
            <div className="container">
              <SearchForm onSearch={ps} />
              <Results photos={photos} searchTerm={searchTerm} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}
