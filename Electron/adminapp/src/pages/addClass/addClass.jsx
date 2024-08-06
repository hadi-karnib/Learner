import React from "react";
import Navbar from "../../components/components/navbar/navbar";
import Sidebar from "../../components/components/sidebar/sidebar";

const AddClass = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
      </div>
    </div>
  );
};

export default AddClass;
