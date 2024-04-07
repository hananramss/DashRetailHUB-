import React, { useState } from "react";
import axios from "axios";
import { UserOutlined, MailFilled , LockFilled } from '@ant-design/icons';
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";

import '../../styles/components/Auth/Login.scss'

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear any previous error messages
    setEmailError("");
    setPasswordError("");
    
    // Perform client-side validation
    if (!email.includes('@gmail.com')) {
      setEmailError("Invalid email address");
      return;
    }
    
    axios
      .post(`${baseUrl}/api/loginAdmin`, { email, password })
      .then((res) => {
        if (res.data.message === "User not registered") {
          setEmailError("User not registered");
        } else if (res.data.success) {
          // User successfully authenticated
          navigate('/dashboard');
        } else {
          // Authentication failed
          setPasswordError("Incorrect password");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPasswordError("Incorrect password. Please try again.");
      });
  };
  

  return (
    <div className="login">
      <div className="login-container">
        <div className="user-icon"> 
          <UserOutlined />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-container"> 
            <div className="input">
              <label className="label"><MailFilled  /></label>
              <input
                type="text"
                placeholder="Email Address"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(""); // Clear any previous error
                }}
                className={emailError ? "error" : ""}
                required
              />
            </div>
            {emailError && <div className="error">{emailError}</div>}

            <div className="input">
              <label className="label"><LockFilled /></label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(""); // Clear any previous error
                }}
                className={passwordError ? "error" : ""}
                required
              />
            </div>
              {passwordError && <div className="error">{passwordError}</div>}
              
          </div>
          <div className="btn">
            <button className="loginBtn" type="submit">LOGIN</button>
          </div>
        </form>

        <p className="sub-options">Don't Have an Account? <Link to="/register"> <u>Sign Up</u> </Link> </p>
      </div>
    </div>
  );
};
