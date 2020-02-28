import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// App components
import SearchForm from "./components/SearchForm";

import apiKey, { flickerAPI } from "./config";
import "./App.css";

export default class App extends Component {
  flickerAPIKey = apiKey;
  flickerAPIUrl = flickerAPI;

  performSearch = q => {
    // axios
    //   .get(`${this.flickerAPIUrl}`)
    //   .then()
    //   .catch();

    console.log(`You searched for: ${q}`);
  };
  render() {
    return (
      <div className="container">
        <SearchForm onSearch={this.performSearch} />
      </div>
    );
  }
}
