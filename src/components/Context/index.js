import React, { Component } from "react";
import axios from "axios";
import apiKey from "../../config";
const PhotoGalleryContext = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photos_coffee: [],
      photos_dogs: [],
      photos_fall: [],
      loading: true,
      searchText: ""
    };
  }

  // default search topics
  defaultSearchTopics = ["coffee", "dogs", "fall"];
  flickerAPIUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&format=json&nojsoncallback=1&tags=`;

  onSearchChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  performSearch = q => {
    this.setState({
      loading: true
    });
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        this.setState({
          photos: photoResults.data.photos.photo,
          searchText: q,
          loading: false
        });
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
  };

  performInitSearch = q => {
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        let resultPhotos = photoResults.data.photos.photo;
        if (q === "sunset") {
          this.setState({
            photos_sunset: resultPhotos,
            searchText: q,
            loading: false
          });
        } else if (q === "python") {
          this.setState({
            photos_python: resultPhotos,
            searchText: q,
            loading: false
          });
        } else if (q === "tigers") {
          this.setState({
            photos_tigers: resultPhotos,
            searchText: q,
            loading: false
          });
        }
        return resultPhotos;
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
  };
  componentDidUpdate() {
    // we get the search string from the url and set the searchText state
    window.onpopstate = e => {
      let href = window.location.href;
      let href_array = href.split("/");
      let q = href_array[4];
      q = q ? q : "";
      this.setState({
        searchText: q
      });
      this.performSearch(q);
    };
  }
  componentDidMount() {
    // we get the search string from the url and set the searchText state when the page loads
    let href = window.location.href;
    let href_array = href.split("/");
    let q = href_array[4];
    q = q ? q : "";
    this.setState({
      searchText: q
    });
    this.performSearch(q);
  }

  // adding "UNSAFE_" per documentation
  UNSAFE_componentWillMount() {
    // if the photos_sunset state is empty let's set it now
    if (this.state.photos_dogs.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[1]);
    }

    // if the photos_python state is empty let's set it now
    if (this.state.photos_fall.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[2]);
    }

    // if the photos_tigers state is empty let's set it now
    if (this.state.photos_coffee.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[0]);
    }
  }

  render() {
    return (
      <PhotoGalleryContext.Provider
        value={{
          defaultSearchTopics: this.defaultSearchTopics,
          photos: this.state.photos,
          photos_coffee: this.state.photos_coffee,
          photos_dogs: this.state.photos_dogs,
          photos_fall: this.state.photos_fall,
          loading: this.state.loading,
          searchText: this.state.searchText,
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
