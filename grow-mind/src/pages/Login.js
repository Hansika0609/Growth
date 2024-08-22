// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css'; // Import the CSS file

const validEmails = [
  'hansikar@amdocs.com',
  'priyanka.pawar5@amdocs.com',
  'nishant.allawadi@amdocs.com'
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [isValidUser, setIsValidUser] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (validEmails.includes(email)) {
      localStorage.setItem('userEmail', email); // Store the email in local storage
      navigate('/home'); // Redirect to crossword page
    } else {
      setIsValidUser(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <input
          type="email"
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsValidUser(true); // Reset validation message on email change
          }}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        {!isValidUser && <p className="error-message">You are not a valid user.</p>}
      </div>
    </div>
  );
};

export default Login;
