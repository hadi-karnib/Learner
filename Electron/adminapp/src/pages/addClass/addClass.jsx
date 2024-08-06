import React, { useEffect, useState } from "react";
import Navbar from "../../components/components/navbar/navbar";
import Sidebar from "../../components/components/sidebar/sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./addClass.css";
import { createClass } from "../../store/classes/classesActions";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddClass = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setInstructor(decodedToken.id); // Assuming the token has userId
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(instructor);

      dispatch(createClass({ title, description, instructor }));
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div className="home-container">
      <ToastContainer />
      <Navbar />
      <div className="wholeContent">
        <Sidebar />
        <div className="content-add">
          <h2 className="bigword">Add a New Class</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create Class</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
