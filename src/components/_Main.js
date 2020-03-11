import React, { Component } from "react";
// import axios from "axios";
import { Consumer } from "./Context";

// App components
//import SearchForm from "./SearchForm";

import "../App.css";
// import Results from "./Results";
// import { act } from "react-dom/test-utils";

let ps = null;
export default class Main extends Component {
  // get querystring
  query = this.props.match.params.searchTerm
    ? this.props.match.params.searchTerm
    : "";

  // //TODO: can use this to set default photos to display
  // componentDidMount() {
  //   // const { searchTerm } = this.props.match.params;
  //   const searchTerm = this.query;
  //   this.setState({
  //     searchTerm
  //   });
  //   if (searchTerm !== undefined && searchTerm.length > 0) {
  //     this.forceUpdate(ps(searchTerm));
  //   }
  // }
  render() {
    return (
      <Consumer>
        {({ actions, photos, searchTerm }) => {
          // ps = actions.performSearch;
          // searchTerm;
          return <div className="container"></div>;
        }}
      </Consumer>
    );
  }
}
