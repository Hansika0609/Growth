import React, { useState, useEffect } from 'react';
import '../styling/AboutModal.css';

const AboutModal = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const utterance = new SpeechSynthesisUtterance(`
        Welcome to the Crossword Puzzle game! Here are the details:
        How to play: Fill in the grid with the correct words based on the clues provided.
        What is this? This is a fun and educational game to improve your Amdocs-based terminology and problem-solving skills.
        Scoring system: Points are awarded based on the number of correct words and the time taken to complete the puzzle. 
        10 points are awarded for each correct answer.
      `);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      setSpeech(utterance);
    }

    return () => {
      window.speechSynthesis.cancel(); // Stop speaking if the modal is closed
      setIsPlaying(false);
    };
  }, [isOpen]);

  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        if (speech) {
          window.speechSynthesis.speak(speech);
        }
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleClose = () => {
    handleStop(); // Stop the speech when closing the modal
    onClose();
  };

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
          <li><strong>What is this?</strong> This is a fun and educational game to improve your Amdocs-based terminology and problem-solving skills.</li>
          <li><strong>Scoring system:</strong> Points are awarded based on the number of correct words and the time taken to complete the puzzle. 10 points are awarded for each correct answer.</li>
        </ul>
        <div className="button-group">
          <button onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play Audio'}
          </button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
