import React from "react";
import { NavLink } from "react-router-dom";

const Nav = props => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          {/* <a href="/">Cats</a> */}
          <NavLink to="/search/cats">Cats</NavLink>
        </li>
        <li>
          {/* <a href="/">Dogs</a> */}
          <NavLink to="/search/dogs">Dogs</NavLink>
        </li>
        <li>
          {/* <a href="/">Computers</a> */}
          <NavLink to="/search/computers">Computers</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
