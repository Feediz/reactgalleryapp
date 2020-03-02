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

  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    console.log(`search term is: ${searchTerm}`);
    if (searchTerm !== undefined && searchTerm.length > 0) {
      this.performSearch(searchTerm);
    }
  }

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
