import React from "react";
import {
  FaHome,
  FaBookOpen,
  FaPenAlt,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <FaHome /> <Link to="/adminpanel">Home</Link>
        </li>
        <li>
          <FaBookOpen /> <Link to="/addClass">Add Classes</Link>
        </li>
        <li>
          <FaPenAlt /> <Link to="/withdrawals">Withdrawls</Link>
        </li>
        <li>
          <FaUpload /> <Link to="/upload">upload</Link>
        </li>
        <li>
          <FaSignOutAlt /> <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
