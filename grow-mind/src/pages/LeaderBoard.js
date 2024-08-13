import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/Leaderboard.css';

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadersPerPage] = useState(5); // Number of leaders per page

  const fetchLeaderboard = () => {
    axios.get('http://localhost:3001/api/leaderboard')
      .then(response => setLeaders(response.data))
      .catch(error => console.error('Error fetching leaderboard data:', error));
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Fetch leaderboard every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Get current leaders for pagination
  const indexOfLastLeader = currentPage * leadersPerPage;
  const indexOfFirstLeader = indexOfLastLeader - leadersPerPage;
  const currentLeaders = leaders.slice(indexOfFirstLeader, indexOfLastLeader);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="leaderboard-container">
      <h1>LeaderBoard</h1>
      <ol className="leaderboard-list">
        {currentLeaders.map((leader, index) => (
          <li key={index} className="leaderboard-item">
            <span className="rank">{indexOfFirstLeader + index + 1}</span>
            <h2>{leader.name} - {leader.score}</h2>
            <p className="email">{leader.email}</p>
          </li>
        ))}
      </ol>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(Math.ceil(leaders.length / leadersPerPage)).keys()].map(pageNumber => (
          <button
            key={pageNumber + 1}
            onClick={() => paginate(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? 'active' : ''}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(leaders.length / leadersPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderBoard;
