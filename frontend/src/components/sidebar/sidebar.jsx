import React from "react";
import { FaHome, FaBookOpen, FaPenAlt, FaSignOutAlt } from "react-icons/fa";
import "./sidebar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authActions";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="Sidebar">
      <ul>
        <li>
          <FaBookOpen /> <Link to="/classes">All Classes</Link>
        </li>
        <li>
          <FaPenAlt /> <Link to="/enroll">Enroll</Link>
        </li>
        <li>
          <FaSignOutAlt /> <Link to="/withdraw">Withdraw</Link>
        </li>
        <li>
          <FaSignOutAlt /> <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
