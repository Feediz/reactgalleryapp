import React, { Component } from "react";
import axios from "axios";
import apiKey, { flickerAPI3 } from "../../config";
const PhotoGalleryContext = React.createContext();

export class Provider extends Component {
  state = {
    photos: [],
    photos_sunset: [],
    photos_tigers: [],
    photos_python: [],
    searchTerm: "",
    loading: true,
    searchText: ""
  };

  defaultSearchTopics = ["tigers", "sunset", "python"];
  flickerAPIKey = apiKey;
  flickerAPIUrl = flickerAPI3;

  onSearchChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };
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
      <PhotoGalleryContext.Provider
        value={{
          photos: this.state.photos,
          photos_sunset: this.state.photos_sunset,
          photos_python: this.state.photos_python,
          photos_tigers: this.state.photos_tigers,
          searchText: this.state.searchText,
          defaultSearchTopics: this.defaultSearchTopics,
          actions: {
            performSearch: this.performSearch,
            onSearchChange: this.onSearchChange
          }
        }}
      >
        {this.props.children}
      </PhotoGalleryContext.Provider>
    );
  }
}

export const Consumer = PhotoGalleryContext.Consumer;
