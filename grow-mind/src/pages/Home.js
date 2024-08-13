import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import AboutModal from './AboutModal';  // Import the AboutModal component

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
    navigate('/crossword', { state: { startTime: Date.now() } });
  };

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <img src={game.image} alt={game.name} style={{ width: '100%', borderRadius: '10px' }} />
            <h2>{game.name}</h2>
            <button><Link to={`/game/${game.id}`}>Start Game</Link></button>
            <button onClick={handleAboutClick}>About/Rules</button>
          </li>
        ))}
        <li>
          <h2>Crossword Puzzle</h2>
          <button onClick={handleStartCrossword}>Start Crossword</button>
          <button onClick={handleAboutClick}>About</button>
        </li>
      </ul>
      <AboutModal isOpen={isAboutOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
