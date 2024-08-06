import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <h1>SEFFSW E-Learner</h1>
      <ul>
        <h2>Welcome Admin</h2>
      </ul>
      <hr />
      <p>Developed by SEFFSW Team</p>
    </div>
  );
};

export default Navbar;
