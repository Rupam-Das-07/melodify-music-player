import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import "./Signup.css";

const Signup = ({ setIsAuthPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthPage(true);
    return () => setIsAuthPage(false);
  }, [setIsAuthPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate signup success
    toast.success("Account created successfully!");
    navigate("/");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="auth-container">
      <button className="close-button" onClick={handleClose}>
        <FiX />
      </button>
      <div className="auth-box">
        <h1>Join Melodify</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
