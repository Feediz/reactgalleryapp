import React, { Component } from "react";
import { Consumer } from "./Context";

import Photo from "./Photo";
import NoResult from "./NoResults";

class Results extends Component {
  render() {
    // const searchTerm = this.props.searchTerm;
    // const p = this.props.photos;

    // console.dir(p);

    return (
      <Consumer>
        {({ actions, searchTerm, searchText, photos }) => {
          let imagesUI = "";
          console.log("searchText: " + searchText);
          console.log("searchTerm: " + searchTerm);
          if (photos.length > 0) {
            imagesUI = photos.map(image => (
              <Photo
                key={image.id}
                photo={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
              />
            ));
            // } else if (searchTerm !== "" && searchTerm !== undefined) {
          //} else if (searchTerm !== "") {
          } else {
            imagesUI = <NoResult searchTerm={searchTerm} />;
          }
          return (
            <div className="photo-container">
              <h2>{searchTerm ? `Search results for ${searchTerm}` : ""}</h2>
              <ul>{imagesUI}</ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Results;
