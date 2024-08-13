import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Game from './pages/Game';
import LeaderBoard from './pages/LeaderBoard';
import Footer from './pages/Footer';
import Crossword from './pages/Crossword';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="*" element={<p>404: Page not found</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


// import React from "react";
// import { Component } from "react";
// import Crossword from "@jaredreisinger/react-crossword";
// // import "./styles.css";
// import { ThemeProvider } from "styled-components";

// const crosswordData = {
//   across: {
//     1: { clue: "SIM Information", answer: "SERIAL_ITEM_INV", row: 0, col: 0 },
//     4: { clue: "Active / Pending / consumed Pass Information", answer: "PREPAID_AGREEMENTS", row: 3, col: 0 },
//     5: { clue: "Features associated with a PP/SOC", answer: "RATED_FEATURE", row: 4, col: 0 },
//     6: { clue: "Account Type and Account Sub Type rules / parameters / boundaries", answer: "ACCOUNT_TYPE", row: 5, col: 0 },
//     7: { clue: "CR ON / OFF Flags", answer: "TOGGLE_ON_OFF", row: 6, col: 3 },
//     8: { clue: "Subscriber Information", answer: "SUBSCRIBER", row: 7, col: 4 },
//     10: { clue: "Has all the error_codes and their description", answer: "ONLINE_MESSAGES", row: 9, col: 2 },
//     11: { clue: "Discount Information", answer: "BAN_DISCOUNT", row: 2, col: 6 },
//     12: { clue: "Intra Port", answer: "AUTO_PORT_Q", row: 8, col: 1 },
//     13: { clue: "Queue table for COP Validations", answer: "COP_ORDER_VAL_QUEUE", row: 1, col: 5 },
//     14: { clue: "Transactions sent to CHUB", answer: "BAN_TRX_LOG", row: 6, col: 1 }
//   },
//   down: {
//     1: { clue: "SOC and AT/ST mapping", answer: "SOC_ACC_TYPE", row: 0, col: 0 },
//     2: { clue: "Security parameters of a Profile", answer: "PROFILE_SEC_PARAMS", row: 0, col: 3 },
//     3: { clue: "Has Job connect details", answer: "JOBDB_CONNECT", row: 0, col: 5 },
//     6: { clue: "Address Details", answer: "ADDRESS_DATA", row: 5, col: 0 },
//     8: { clue: "Soc Classification Relation", answer: "SOC_CLASSIF_RELATION", row: 7, col: 4 },
//     9: { clue: "Cycle Information", answer: "CYCLE_CONTROL", row: 7, col: 7 },
//     15: { clue: "BANs and Subscribers PP/SOC information", answer: "SERVICE_AGREEMENT", row: 1, col: 4 },
//     16: { clue: "Price Plan and SOC Recurring Charge Information", answer: "PP_RC_RATE", row: 3, col: 2 }
//   }
// };

// const theme = {
//   gridBackground: "rgb(255, 0, 0)"
// };

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h2>Crossword Puzzle</h2>
//           <ThemeProvider theme={theme}>
//             <Crossword data={crosswordData} />
//           </ThemeProvider>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
