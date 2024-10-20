// src/Navbar.js

import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import "./Navbar.css"; // Optional: CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>My Application</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-data">Add Data</Link>
        </li>
        <li>
          <Link to="/view-data">View Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
