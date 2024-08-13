// src/components/AboutModal.js
import React from 'react';
import '../styling/AboutModal.css';  // Make sure to style your modal

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>About the Crossword Puzzle</h2>
        <p>Welcome to the Crossword Puzzle game! Here are the details:</p>
        <ul>
          <li><strong>How to play:</strong> Fill in the grid with the correct words based on the clues provided.</li>
          <li><strong>What is this?</strong> This is a fun and educational game to improve your amdocs based terminology and problem-solving skills.</li>
          <li><strong>Scoring system:</strong> Points are awarded based on the number of correct words and the time taken to complete the puzzle. 10 points awarded for each correct answer.</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AboutModal;
