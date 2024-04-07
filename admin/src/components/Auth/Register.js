import React, { useState } from "react";
import axios from "axios";
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link  } from "react-router-dom";

import '../../styles/components/Auth/Login.scss'

// Modal component for success message
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Registration Successful!</h3>
        <p>Your account has been successfully registered.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  // Function to handle form submission (Add)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear any previous error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    // Perform client-side validation
    if (!email.includes('@gmail.com')) {
      setEmailError("Invalid email address");
      return;
    }

    if (!isValidUsername(username)) {
      setUsernameError("Username must contain only letters, numbers, or underscores");
      return;
    }

    if (password !== confirmPass) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    axios
      .post(`${baseUrl}/api/registerAdmin`, { username, email, password }) 
      .then((res) => {
        if (res.data.error) {
          setPasswordError(res.data.error);
        } else {
          // Store username in local storage upon successful registration
          localStorage.setItem('username', username);
          navigate('/login'); 
          setShowSuccessModal(true); // Show success modal on successful registration
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPasswordError("An error occurred while processing your request.");
      });
  };

  const isValidUsername = (username) => {
    // Regular expression to validate username containing only letters, numbers, or underscores
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };
  
  return (
    <div className="login">
      <div className="login-container">
        <div className="reg-icon"> 
          <UserOutlined />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-container">
            <div className="input">
              <label className="label"><UserOutlined/></label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                className={usernameError ? "error" : ""}
                required
              />
            </div>
            {usernameError && <div className="error">{usernameError}</div>}
            <div className="input">
              <label className="label"><MailFilled  /></label>
              <input
                type="text"
                placeholder="Email Address"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
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
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={passwordError ? "error" : ""}
                required
              />
            </div>
            <div className="input">
              <label className="label"><LockFilled /></label>
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPass(e.target.value)}
                className={passwordError ? "error" : ""}
                required
              />
            </div>
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="btn">
            <button className="loginBtn" type="submit">REGISTER</button>
          </div>
        </form>

        {/* Success modal */}
        <SuccessModal isOpen={showSuccessModal} onClose={closeModal} />
        
        <p className="sub-options">Don't Have an Account? <Link to="/login"> <u>Login</u> </Link> </p>
      </div>
    </div>
  );
};
