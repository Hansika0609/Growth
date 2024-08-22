import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/AdminSettings.css'; // Import the CSS file

const AdminSettings = () => {
  const [loginWindowStartTime, setLoginWindowStartTime] = useState('');
  const [loginWindowEndTime, setLoginWindowEndTime] = useState('');
  const [gameTimer, setGameTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');  // Redirect to login if no token is found
    } else {
      axios.get('http://localhost:3001/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setLoginWindowStartTime(response.data.loginWindowStartTime);
        setLoginWindowEndTime(response.data.loginWindowEndTime);
        setGameTimer(response.data.gameTimer);
      })
      .catch(() => navigate('/admin/login'));  // Redirect to login if the token is invalid or request fails
    }
  }, [navigate]);

  const handleSaveSettings = () => {
    const token = localStorage.getItem('adminToken');
    axios.post('http://localhost:3001/api/admin/settings', { 
      loginWindowStartTime, 
      loginWindowEndTime, 
      gameTimer 
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      alert('Settings updated successfully');
      setLoginWindowStartTime(response.data.loginWindowStartTime);
      setLoginWindowEndTime(response.data.loginWindowEndTime);
      setGameTimer(response.data.gameTimer);
    })
    .catch(() => {
      alert('Failed to update settings');
    });
  };

  return (
    <div className="admin-settings-container">
      <h1>Admin Settings</h1>
      <div className="settings-group">
        <label className="settings-label">
          Login Window Start Time:
          <input
            type="datetime-local"
            value={loginWindowStartTime}
            onChange={(e) => setLoginWindowStartTime(e.target.value)}
            className="settings-input"
          />
        </label>
      </div>
      <div className="settings-group">
        <label className="settings-label">
          Login Window End Time:
          <input
            type="datetime-local"
            value={loginWindowEndTime}
            onChange={(e) => setLoginWindowEndTime(e.target.value)}
            className="settings-input"
          />
        </label>
      </div>
      <div className="settings-group">
        <label className="settings-label">
          Game Timer (minutes):
          <input
            type="number"
            value={gameTimer}
            onChange={(e) => setGameTimer(e.target.value)}
            className="settings-input"
          />
        </label>
      </div>
      <button onClick={handleSaveSettings} className="admin-settings-button">Save Settings</button>
    </div>
  );
};

export default AdminSettings;
