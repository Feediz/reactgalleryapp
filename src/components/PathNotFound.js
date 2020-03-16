import React from "react";
import { NavLink } from "react-router-dom";

const PathNotFound = props => {
  return (
    <div className="not-found">
      <h3>
        We can not find the path/page you are looking for. Click
        <NavLink to={`/`}>here</NavLink> if you want to go to the search page.
      </h3>
    </div>
  );
};

export default PathNotFound;
