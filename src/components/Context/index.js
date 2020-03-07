import React, { Component } from "react";
import axios from "axios";
import apiKey, { flickerAPI3 } from "../../config";
import Results from '../Results';
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

  performInitSearch = (q, itemToSet) => {
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        if(itemToSet === 'sunset') {
          this.setState({
            photos_sunset: photoResults.data.photos.photo,
            searchTerm: q,
            loading: false
          });
          
       } else if(itemToSet === 'python') {
          this.setState({
            photos_python: photoResults.data.photos.photo,
            searchTerm: q,
            loading: false
          });
       }
       else if(itemToSet === 'tigers') {
          this.setState({
            photos_tigers: photoResults.data.photos.photo,
            searchTerm: q,
            loading: false
          });
       }
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
  };


  componentDidMount() {
    
    // if the photos_sunset state is empty let's set it now
    if(this.state.photos_sunset.length < 1) {
      console.log('this.state.photos_sunset.lengthasdfasdf: ' + this.state.photos_sunset.length);
      this.performInitSearch(this.defaultSearchTopics[1], 'sunset');
    }

    // if the photos_python state is empty let's set it now
    if(this.state.photos_python.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[2], 'python');
    }

    // if the photos_tigers state is empty let's set it now
    if(this.state.photos_tigers.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[0], 'tigers');
    }
  }


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
