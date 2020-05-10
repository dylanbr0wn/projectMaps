import React from "react";
import "./header.css"
import { Link } from 'react-router-dom';

const Header = () => (
    <div className="row1">
        <Link className="header-link-gps" to="/gps">GPS</Link>
        <h1 className="app-title">Project Maps</h1>
        <Link className="header-link-home" to="/">Home</Link>
    </div>
);
export default Header;