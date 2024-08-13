import React from 'react';

const CrosswordGrid = ({ grid }) => {
  return (
    <div className="crossword-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="grid-cell">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
