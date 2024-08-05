import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

const Withdrawal = () => {
  return (
    <div>
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default Withdrawal;
