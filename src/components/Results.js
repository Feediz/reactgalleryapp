import React, { Component } from "react";
import PropTypes from "prop-types";

import Photo from "./Photo";
import NoResult from "./NoResults";

class Results extends Component {
  render() {
    const searchTerm = this.props.searchTerm;
    const p = this.props.photos;

    console.dir(p);
    let imagesUI = "";
    if (p.length > 0) {
      imagesUI = p.map(image => (
        <Photo
          key={image.id}
          photo={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
        />
      ));
    } else if (searchTerm !== "") {
      imagesUI = <NoResult />;
    }
    return (
      <div className="photo-container">
        <h2>{searchTerm ? `Search results for ${searchTerm}` : ""}</h2>
        <ul>{imagesUI}</ul>
      </div>
    );
  }
}

Results.propTypes = {};

export default Results;
