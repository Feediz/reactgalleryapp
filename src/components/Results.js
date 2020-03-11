import React, { Component } from "react";
import { Consumer } from "./Context";

import Photo from "./Photo";
import NoResult from "./NoResults";

class Results extends Component {
  render() {
    // const searchText = this.props.searchText;
    // const p = this.props.photos;

    // console.dir(p);

    return (
      <Consumer>
        {({ actions, searchText, photos }) => {
          let imagesUI = "";
          // console.log("searchText: " + searchText);
          // console.log("searchText: " + searchText);
          if (photos.length > 0) {
            imagesUI = photos.map(image => (
              <Photo
                key={image.id}
                photo={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              />
            ));
            // } else if (searchText !== "" && searchText !== undefined) {
            //} else if (searchText !== "") {
          } else {
            imagesUI = <NoResult searchText={searchText} />;
          }
          return (
            <div className="photo-container">
              <h2>{searchText ? `Search results for ${searchText}` : ""}</h2>
              <ul>{imagesUI}</ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Results;
