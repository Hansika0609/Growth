// src/CrosswordPuzzle.js

import React from 'react';
import Crossword from '@jaredreisinger/react-crossword';

const crosswordData = [
  { number: 1, answer: "SERIAL", question: "SIM Information", direction: "across", row: 0, col: 0 },
  { number: 4, answer: "PREPAID", question: "Active / Pending / consumed Pass Information", direction: "across", row: 3, col: 0 },
  { number: 5, answer: "RATED", question: "Features associated with a PP/SOC", direction: "across", row: 4, col: 0 },
  { number: 6, answer: "ACCOUNT", question: "Account Type and Account Sub Type rules / parameters / boundaries", direction: "across", row: 5, col: 0 },
  { number: 7, answer: "TOGGLE", question: "CR ON / OFF Flags", direction: "across", row: 6, col: 3 },
  { number: 8, answer: "SUBSCRIBER", question: "Subscriber Information", direction: "across", row: 7, col: 4 },
  { number: 10, answer: "ONLINE", question: "Has all the error_codes and their description", direction: "across", row: 9, col: 2 },
  { number: 1, answer: "SOC", question: "SOC and AT/ST mapping", direction: "down", row: 0, col: 0 },
  { number: 2, answer: "PROFILE", question: "Security parameters of a Profile", direction: "down", row: 0, col: 3 },
  { number: 3, answer: "JOBDBCONNECT", question: "Has Job connect details", direction: "down", row: 0, col: 5 },
  { number: 6, answer: "ADDRESS", question: "Address Details", direction: "down", row: 5, col: 0 },
  { number: 8, answer: "CLASSIFI", question: "Soc Classification Relation", direction: "down", row: 7, col: 4 },
  { number: 9, answer: "CYCLE", question: "Cycle Information", direction: "down", row: 7, col: 7 }
];

const data = {
  across: {},
  down: {}
};

crosswordData.forEach((item) => {
  const key = `${item.row},${item.col}`;
  if (item.direction === 'across') {
    data.across[key] = { clue: item.question, answer: item.answer, row: item.row, col: item.col };
  } else {
    data.down[key] = { clue: item.question, answer: item.answer, row: item.row, col: item.col };
  }
});

const CrosswordPuzzle = () => {
  return (
    <div>
      <h1>Crossword Puzzle</h1>
      <Crossword data={data} />
    </div>
  );
};

export default CrosswordPuzzle;
