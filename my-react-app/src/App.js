import React, { useState } from 'react';
import './App.css';
import CrosswordGrid from './CrosswordGrid';
import { generateGrid } from './crosswordGenerator';

const crosswordData = [
  { number: 1, answer: "SERIAL", question: "SIM Information" },
  { number: 4, answer: "PREPAID", question: "Active / Pending / consumed Pass Information" },
  { number: 5, answer: "RATED", question: "Features associated with a PP/SOC" },
  { number: 6, answer: "ACCOUNT", question: "Account Type and Account Sub Type rules / parameters / boundaries" },
  { number: 7, answer: "TOGGLE", question: "CR ON / OFF Flags" },
  { number: 8, answer: "SUBSCRIBER", question: "Subscriber Information" },
  { number: 10, answer: "ONLINE", question: "Has all the error_codes and their description" },
  { number: 1, answer: "SOC", question: "SOC and AT/ST mapping" },
  { number: 2, answer: "PROFILE", question: "Security parameters of a Profile" },
  { number: 3, answer: "JOBDBCONNECT", question: "Has Job connect details" },
  { number: 6, answer: "ADDRESS", question: "Address Details" },
  { number: 8, answer: "CLASSIFI", question: "Soc Classification Relation" },
  { number: 9, answer: "CYCLE", question: "Cycle Information" }
];

function App() {
  const [grid, setGrid] = useState([]);

  const handleGenerate = () => {
    const newGrid = generateGrid(crosswordData);
    setGrid(newGrid);
  };

  return (
    <div className="App">
      <h1>Crossword Puzzle Maker</h1>
      <button onClick={handleGenerate}>Generate Crossword</button>
      <CrosswordGrid grid={grid} />
    </div>
  );
}

export default App;
