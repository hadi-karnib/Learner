import React from "react";
import { FaHome, FaBookOpen, FaPenAlt, FaSignOutAlt } from "react-icons/fa";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <FaBookOpen /> <Link to="/addClass">Add Classes</Link>
        </li>
        <li>
          <FaPenAlt /> <Link to="/enroll">Enroll</Link>
        </li>
        <li>
          <FaSignOutAlt /> <Link to="/withdraw">Withdraw</Link>
        </li>
        <li>
          <FaSignOutAlt /> <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
