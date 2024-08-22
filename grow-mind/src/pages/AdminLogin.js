import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:3001/api/admin/login', { username, password })
      .then(response => {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/home');
      })
      .catch(() => {
        setError('Invalid username or password');
      });
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="admin-login-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="admin-login-input"
      />
      <button onClick={handleLogin} className="admin-login-button">Login</button>
      {error && <p className="admin-login-error">{error}</p>}
    </div>
  );
};

export default AdminLogin;
