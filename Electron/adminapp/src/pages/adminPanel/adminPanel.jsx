import React from "react";
import "./adminPanel.css";
import Sidebar from "../../components/components/sidebar/sidebar";
import Navbar from "./../../components/components/navbar/navbar";
const AdminPanel = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminPanel;
