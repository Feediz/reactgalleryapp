import React, { Component } from "react";
import axios from "axios";
import apiKey, { flickerAPI3 } from "../../config";
const PhotoGalleryContext = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photos_sunset: [],
      photos_tigers: [],
      photos_python: [],
      loading: true,
      searchText: ""
    };
  }

  // state = {
  //   photos: [],
  //   photos_sunset: [],
  //   photos_tigers: [],
  //   photos_python: [],
  //   loading: true,
  //   searchText: ""
  // };

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
          searchText: q,
          loading: false
        });
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
  };

  performInitSearch = (q, itemToSet) => {
    // console.log(`init search for: ${q}`);
    axios
      .get(`${this.flickerAPIUrl}${q}`)
      .then(photoResults => {
        let resultPhotos = photoResults.data.photos.photo;
        // console.log(`results for ${q} are :`);
        // console.dir(resultPhotos);

        if (itemToSet === "sunset") {
          this.setState({
            photos_sunset: resultPhotos,
            searchText: q,
            loading: false
          });
        } else if (itemToSet === "python") {
          this.setState({
            photos_python: resultPhotos,
            searchText: q,
            loading: false
          });
        } else if (itemToSet === "tigers") {
          this.setState({
            photos_tigers: resultPhotos,
            searchText: q,
            loading: false
          });
        }
        return resultPhotos;
        // console.dir("this.state in inittttt");
        // console.dir(this.state);
      })
      .catch(function(err) {
        console.error("Error fetching/parsing photos", err);
      });
    // console.dir(this.state);
  };
  componentDidUpdate() {
    window.onpopstate = e => {
      let href = window.location.href;
      let href_array = href.split("/");
      let q = href_array[4];
      q = q ? q : "tea";
      this.setState({
        searchText: q
      });
      this.performSearch(q);
    };
  }
  componentWillMount() {
    // console.log("componentWillMount");
    // if the photos_sunset state is empty let's set it now
    if (this.state.photos_sunset.length < 1) {
      // this.performInitSearch(this.defaultSearchTopics[1], "sunset");
      // console.log("HELLLLOOOOOOOOOOO");
      this.performInitSearch("sunset", "sunset");

      // console.log(
      //   "this.state.photos_sunset.lengthasdfasdf: " +
      //     this.state.photos_sunset.length
      // );
    }

    // if the photos_python state is empty let's set it now
    if (this.state.photos_python.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[2], "python");
    }

    // if the photos_tigers state is empty let's set it now
    if (this.state.photos_tigers.length < 1) {
      this.performInitSearch(this.defaultSearchTopics[0], "tigers");
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
