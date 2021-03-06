import React from "react";
import PropTypes from "prop-types";

const Photo = props => {
  return (
    <div id="img">
      <li>
        <img src={props.photo} alt="" />
      </li>
    </div>
  );
};

Photo.propTypes = {
  photo: PropTypes.string.isRequired
};

export default Photo;
