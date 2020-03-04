import React from "react";
import { NavLink } from "react-router-dom";

const defaultSearchTopics = ["tigers", "sunset", "python"];
const Nav = props => {
  return (
    <nav className="main-nav">
      <ul>
        {/* <li> */}
        {/* <a href="/">Cats</a> */}
        {defaultSearchTopics.map(topic => (
          <li key={topic}>
            <NavLink
              onClick={() => {
                props.performSearch(`${topic}`);
              }}
              to={`/search/${topic}`}
            >
              {topic}
            </NavLink>
          </li>
        ))}
        {/* <NavLink
            onClick={() => {
              props.performSearch("cats");
            }}
            to="/search/cats"
          >
            Cats
          </NavLink>
        </li>
        <li>
          {/* <a href="/">Dogs</a> 
          <NavLink
            onClick={() => {
              props.performSearch("dogs");
            }}
            to="/search/dogs"
          >
            Dogs
          </NavLink>
        </li>
        <li>
          
          <NavLink
            onClick={() => {
              props.performSearch("computers");
            }}
            to="/search/computers"
          >
            Computers
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
