import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/leaderboard');
  };

  const isValidGameId = (id) => {
    // Implement validation logic for game ID
    const validIds = ['1', '2', '3']; // Example valid IDs
    return validIds.includes(id);
  };

  if (!isValidGameId(id)) {
    return <p>Invalid game ID. Please go back to the home page and select a valid game.</p>;
  }

  return (
    <div>
      <h1>Game {id}</h1>
      <main>
        <p>Game content goes here...</p>
        <button onClick={handleComplete}>Complete Game</button>
      </main>
    </div>
  );
};

export default Game;
