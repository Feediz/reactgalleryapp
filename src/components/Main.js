import React, { Component } from "react";
import axios from "axios";

// App components
import SearchForm from "./SearchForm";

import apiKey, { flickerAPI3 } from "../config";
import "../App.css";
import Results from "./Results";

export default class Main extends Component {
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

  //TODO: can use this to set default photos to display
  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    if (searchTerm !== undefined && searchTerm.length > 0) {
      this.forceUpdate(this.performSearch(searchTerm));
    }
  }

  performSearch = q => {
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        this.setState({
          photos: photoResults.data.photos.photo,
          searchTerm: q,
          loading: false
        });
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
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
