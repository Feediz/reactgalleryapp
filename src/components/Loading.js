import React from "react";
import PropTypes from "prop-types";

const Loading = props => {
  return (
    <div class="cssload-preloader">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </div>
  );
};

Loading.propTypes = {
  searchText: PropTypes.string
};

export default Loading;
