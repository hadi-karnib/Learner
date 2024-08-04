import React from "react";
import Navbar from "../../components/navbar/navbar";
import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
