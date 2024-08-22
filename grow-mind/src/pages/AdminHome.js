import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');  // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleDownload = () => {
    axios({
      url: 'http://localhost:3001/api/download-leaderboard',
      method: 'GET',
      responseType: 'blob',
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leaderboard.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(() => {
      alert('Failed to download leaderboard');
    });
  };

  return (
    <div className="admin-home-container">
      <h1>Admin Home</h1>
      <button onClick={() => navigate('/leaderboard', { state: { referrer: 'admin/home' } })} className="admin-home-button">View Leaderboard</button>
      <button onClick={handleDownload} className="admin-home-button">Download Leaderboard as Excel</button>
      <button onClick={() => navigate('/admin/settings')} className="admin-home-button">Update Game Settings</button>
    </div>
  );
};

export default AdminHome;
