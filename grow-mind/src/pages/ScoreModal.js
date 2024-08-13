import React from 'react';
import '../styling/ScoreModal.css';
const ScoreModal = ({ isOpen, score, elapsedTime, onClose }) => {
  if (!isOpen) return null;

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Score</h2>
        <p>Your Score: {score}</p>
        <p>Time Taken: {formatTime(elapsedTime)}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ScoreModal;
