import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import AboutModal from './AboutModal';  // Import the AboutModal component
import '../styling/Home.css'; // Import the new CSS file for styling

const Home = () => {
  const [games, setGames] = useState([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch games data from an API or backend
    const fetchGames = async () => {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const handleAboutClick = () => {
    setIsAboutOpen(true);
  };

  const handleCloseModal = () => {
    setIsAboutOpen(false);
  };

  const handleStartCrossword = () => {
    setStartTime(Date.now());
    localStorage.setItem('crosswordStartTime', Date.now());
    navigate('/crossword', { state: { startTime: Date.now() } });
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Unleash Your Inner Champion in the Game Nexus!</h1>
      <div className="games-list">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <img src={game.image} alt={game.name} className="game-image" />
            <h2 className="game-name">{game.name}</h2>
            <div className="game-buttons">
              <Link to={`/game/${game.id}`} className="game-button">
                Start Game
              </Link>
              <button onClick={handleAboutClick} className="game-button">
                About/Rules
              </button>
            </div>
          </div>
        ))}
        <div className="game-card">
          <h2 className="game-name">Crossword Puzzle</h2>
          <div className="game-buttons">
            <button onClick={handleStartCrossword} className="game-button">
              Start Crossword
            </button>
            <button onClick={handleAboutClick} className="game-button">
              About
            </button>
          </div>
        </div>
        <div className="leaderboard-section">
          <button onClick={handleLeaderboardClick} className="leaderboard-button">
            View Leaderboard
          </button>
        </div>
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
