import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

const Header = () => (
    <div className="row1">
        <NavLink
            activeClassName="active-link"
            className="header-link-gps"
            to="/gps"
        >
            GPS
        </NavLink>
        <h1 className="app-title">Project Maps</h1>
        <NavLink
            activeClassName="active-link"
            className="header-link-home"
            exact
            to="/"
        >
            Home
        </NavLink>
    </div>
);
export default Header;
