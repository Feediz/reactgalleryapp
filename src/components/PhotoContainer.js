import React, { Component } from "react";
import { Consumer } from "./Context";

import Photo from "./Photo";
import NoResult from "./NoResults";

class PhotoContainer extends Component {
  render() {
    return (
      <Consumer>
        {({ actions, searchText, photos }) => {
          let imagesUI = "";
          if (photos.length > 0) {
            imagesUI = photos.map(image => (
              <Photo
                key={image.id}
                photo={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              />
            ));
          } else {
            imagesUI = <NoResult searchText={searchText} />;
          }
          return (
            <div className="photo-container">
              <h2 className="hit-the-floor">
                {searchText ? `Search results for ${searchText}` : ""}
              </h2>
              <ul>{imagesUI}</ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default PhotoContainer;
