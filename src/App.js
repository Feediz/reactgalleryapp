import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// App components
import SearchForm from "./components/SearchForm";

import apiKey, { flickerAPI3 } from "./config";
import "./App.css";
import Results from "./components/Results";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      searchTerm: "",
      loading: true
    };
  }
  flickerAPIKey = apiKey;
  flickerAPIUrl = flickerAPI3;

  performSearch = q => {
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        console.dir(photoResults);
        this.setState({
          photos: photoResults.data.photos.photo,
          searchTerm: q,
          loading: false
        });
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });

    // console.log(`You searched for: ${q}`);
  };
  render() {
    return (
      <div className="container">
        <SearchForm onSearch={this.performSearch} />
        <Results
          photos={this.state.photos}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }
}
