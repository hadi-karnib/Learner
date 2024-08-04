import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../store/auth/authActions";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || phone_number === "" || password === "") {
      toast.error("Please fill all the fields");
    } else {
      dispatch(signup({ name, email, password, phone_number, navigate }));
    }
  };

  return (
    <div className="mainDiv">
      <div className="register-container">
        <ToastContainer position="top-right"></ToastContainer>
        <h1 className="register-header">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={phone_number}
              placeholder="Enter your number eg: 03123123"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/" className="link">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
