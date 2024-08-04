import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    } else {
      dispatch(login({ email, password, navigate }));
    }
  };

  return (
    <div className="mainDiv">
      <div className="login-container">
        <ToastContainer position="top-right"></ToastContainer>
        <h1 className="login-header">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
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
          <div className="login-input-group">
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
          <button className="login-button" type="submit">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
