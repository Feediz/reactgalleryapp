import React from "react";
import { Consumer } from "./Context";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Consumer>
      {({ defaultSearchTopics, actions }) => {
        return (
          <nav className="main-nav">
            <ul>
              {defaultSearchTopics.map(topic => (
                <li key={topic}>
                  <NavLink
                    onClick={() => {
                      actions.performSearch(`${topic}`);
                    }}
                    to={`/search/${topic}`}
                  >
                    {topic}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
};

export default Nav;
