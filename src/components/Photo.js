import React, { Component } from "react";
import PropTypes from "prop-types";

const Photo = props => {
  return (
    <div>
      <li>
        <img src={props.photo} alt="" />
      </li>
    </div>
  );
};

Photo.propTypes = {};

export default Photo;
