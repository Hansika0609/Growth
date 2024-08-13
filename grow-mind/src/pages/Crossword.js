// import React, { useCallback, useRef, useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Crossword from "@jaredreisinger/react-crossword";
// import AboutModal from './AboutModal';
// import ScoreModal from './ScoreModal';
// import "../styling/Crossword.css";

// const data = {
//   across: {
//     1: {
//       clue: "Queue table for COP Validations",
//       answer: "COP_ORDER_VAL_QUEUE",
//       row: 1,
//       col: 1,
//     },
//     2: {
//       clue: "Price Plan and SOC Recurring Charge Information",
//       answer: "PP_RC_RATE",
//       row: 3,
//       col: 0,
//     },
//     3: {
//       clue: "Has Job connect details",
//       answer: "JOBDB_CONNECT",
//       row: 3,
//       col: 12,
//     },
//     4: {
//       clue: "Features associated with a PP/SOC",
//       answer: "RATED_FEATURE",
//       row: 6,
//       col: 8,
//     },
//     5: {
//       clue: "Subscriber Information",
//       answer: "SUBSCRIBER",
//       row: 8,
//       col: 13,
//     },
//     6: {
//       clue: "Security parameters of a Profile",
//       answer: "PROFILE_SEC_PARAMS",
//       row: 22,
//       col: 0,
//     },
//     7: {
//       clue: "BANs and Subscribers PP/SOC information",
//       answer: "SERVICE_AGREEMENT",
//       row: 23,
//       col: 2,
//     },
//   },
//   down: {
//     8: {
//       clue: "Soc Classification Relation",
//       answer: "SOC_CLASSIF_RELATION",
//       row: 0,
//       col: 5,
//     },
//     9: {
//       clue: "Cycle Information",
//       answer: "CYCLE_CONTROL",
//       row: 3,
//       col: 23,
//     },
//     10: {
//       clue: "Intra Port",
//       answer: "AUTO_PORT_Q",
//       row: 4,
//       col: 10,
//     },
//     11: {
//       clue: "Active / Pending / consumed Pass Information",
//       answer: "PREPAID_AGREEMENTS",
//       row: 5,
//       col: 8,
//     },
//     12: {
//       clue: "Discount Information",
//       answer: "BAN_DISCOUNT",
//       row: 8,
//       col: 15,
//     },
//     13: {
//       clue: "CR ON / OFF Flags",
//       answer: "TOGGLE_ON_OFF",
//       row: 10,
//       col: 3,
//     },
//     14: {
//       clue: "SIM Information",
//       answer: "SERIAL_ITEM_INV",
//       row: 10,
//       col: 20,
//     },
//     15: {
//       clue: "Address Details",
//       answer: "ADDRESS_DATA",
//       row: 11,
//       col: 13,
//     },
//     16: {
//       clue: "Account Type and Account Sub Type rules / parameters / boundaries",
//       answer: "ACCOUNT_TYPE",
//       row: 12,
//       col: 0,
//     },
//     17: {
//       clue: "Has all the error_codes and their description",
//       answer: "ONLINE_MESSAGES",
//       row: 10,
//       col: 21,
//     },
//     18: {
//       clue: "Transactions sent to CHUB",
//       answer: "BAN_TRX_LOG",
//       row: 5,
//       col: 24,
//     },
//     19: {
//       clue: "SOC and AT/ST mapping",
//       answer: "SOC_ACC_TYPE",
//       row: 10,
//       col: 19,
//     },
//   },
// };

// function CrosswordApp() {
//   const crossword = useRef();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const startTime = location.state?.startTime || Date.now(); // Retrieve the start time from state or use current time
//   const [correctAnswers, setCorrectAnswers] = useState(new Set());
//   const [isAboutOpen, setIsAboutOpen] = useState(false);
//   const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
//   const [score, setScore] = useState(0);
//   const [endTime, setEndTime] = useState(0);
//   const [submissionError, setSubmissionError] = useState('');

//   const handleCorrect = useCallback((direction, number) => {
//     setCorrectAnswers((prev) => {
//       const newCorrectAnswers = new Set(prev);
//       newCorrectAnswers.add(`${direction}-${number}`);
//       setScore(newCorrectAnswers.size * 10);
//       return newCorrectAnswers;
//     });
//   }, []);

//   const handleIncorrect = useCallback((direction, number) => {
//     setCorrectAnswers((prev) => {
//       const newCorrectAnswers = new Set(prev);
//       newCorrectAnswers.delete(`${direction}-${number}`);
//       setScore(newCorrectAnswers.size * 10);
//       return newCorrectAnswers;
//     });
//   }, []);

//   const handleSubmit = () => {
//     setEndTime(Date.now());
//     const playerName = prompt("Choose a legendary alias to etch your name on the leaderboard!");
//     const email = localStorage.getItem('userEmail'); // Retrieve email from local storage

//     axios.post('http://localhost:3001/api/submit-score', {
//       name: playerName,
//       email: email,
//       score: score,
//       startTime: startTime
//     }).then(() => {
//       setIsScoreModalOpen(true);
//       navigate('/leaderboard');
//     }).catch(error => {
//       console.error('Error submitting score:', error);
//       if (error.response && error.response.data) {
//         setSubmissionError(error.response.data.message);
//       }
//     });
//   };

//   const handleAboutClick = () => {
//     setIsAboutOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsAboutOpen(false);
//     setIsScoreModalOpen(false);
//   };

//   const elapsedTime = Math.floor((endTime - startTime) / 1000); // Calculate elapsed time in seconds

//   return (
//     <div className="Page">
//       <h1 className="Header">Crossword Puzzle</h1>
//       <div className="Content">
//         <div className="about-icon" onClick={handleAboutClick}>?</div>
//         <div className="CrosswordWrapper">
//           <Crossword
//             data={data}
//             ref={crossword}
//             theme={{
//               gridBackground: "#441151",
//               cellBackground: "#F9EEFC",
//               cellBorder: "#441151",
//               textColor: "rgb(0,0,0)",
//               numberColor: "rgba(0,0,0, 0.8)",
//               focusBackground: "#FFBA08",
//               highlightBackground: "#FFF3D6",
//             }}
//             onCorrect={handleCorrect}
//             onIncorrect={handleIncorrect}
//             onCrosswordCorrect={() => setEndTime(Date.now())} // Stop timer when crossword is completed
//           />
//         </div>
//       </div>
//       <div className="Commands">
//         <button className="Command" onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//       {submissionError && <p style={{ color: 'red' }}>{submissionError}</p>}
//       <AboutModal isOpen={isAboutOpen} onClose={handleCloseModal} />
//       <ScoreModal isOpen={isScoreModalOpen} score={score} onClose={handleCloseModal} elapsedTime={elapsedTime} />
//     </div>
//   );
// }

// export default CrosswordApp;







import React, { useCallback, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Crossword from "@jaredreisinger/react-crossword";
import AboutModal from './AboutModal';
import ScoreModal from './ScoreModal';
import "../styling/Crossword.css";
const data = {
  across: {
    1: {
      clue: "Queue table for COP Validations",
      answer: "COP_ORDER_VAL_QUEUE",
      row: 1,
      col: 1,
    },
    2: {
      clue: "Price Plan and SOC Recurring Charge Information",
      answer: "PP_RC_RATE",
      row: 3,
      col: 0,
    },
    3: {
      clue: "Has Job connect details",
      answer: "JOBDB_CONNECT",
      row: 3,
      col: 12,
    },
    4: {
      clue: "Features associated with a PP/SOC",
      answer: "RATED_FEATURE",
      row: 6,
      col: 8,
    },
    5: {
      clue: "Subscriber Information",
      answer: "SUBSCRIBER",
      row: 8,
      col: 13,
    },
    6: {
      clue: "Security parameters of a Profile",
      answer: "PROFILE_SEC_PARAMS",
      row: 22,
      col: 0,
    },
    7: {
      clue: "BANs and Subscribers PP/SOC information",
      answer: "SERVICE_AGREEMENT",
      row: 23,
      col: 2,
    },
  },
  down: {
    8: {
      clue: "Soc Classification Relation",
      answer: "SOC_CLASSIF_RELATION",
      row: 0,
      col: 5,
    },
    9: {
      clue: "Cycle Information",
      answer: "CYCLE_CONTROL",
      row: 3,
      col: 23,
    },
    10: {
      clue: "Intra Port",
      answer: "AUTO_PORT_Q",
      row: 4,
      col: 10,
    },
    11: {
      clue: "Active / Pending / consumed Pass Information",
      answer: "PREPAID_AGREEMENTS",
      row: 5,
      col: 8,
    },
    12: {
      clue: "Discount Information",
      answer: "BAN_DISCOUNT",
      row: 8,
      col: 15,
    },
    13: {
      clue: "CR ON / OFF Flags",
      answer: "TOGGLE_ON_OFF",
      row: 10,
      col: 3,
    },
    14: {
      clue: "SIM Information",
      answer: "SERIAL_ITEM_INV",
      row: 10,
      col: 20,
    },
    15: {
      clue: "Address Details",
      answer: "ADDRESS_DATA",
      row: 11,
      col: 13,
    },
    16: {
      clue: "Account Type and Account Sub Type rules / parameters / boundaries",
      answer: "ACCOUNT_TYPE",
      row: 12,
      col: 0,
    },
    17: {
      clue: "Has all the error_codes and their description",
      answer: "ONLINE_MESSAGES",
      row: 10,
      col: 21,
    },
    18: {
      clue: "Transactions sent to CHUB",
      answer: "BAN_TRX_LOG",
      row: 5,
      col: 24,
    },
    19: {
      clue: "SOC and AT/ST mapping",
      answer: "SOC_ACC_TYPE",
      row: 10,
      col: 19,
    },
  },
};
function CrosswordApp() {
  const crossword = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const startTime = location.state?.startTime || Date.now(); // Retrieve the start time from state or use current time
  const [correctAnswers, setCorrectAnswers] = useState(new Set());
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const handleCorrect = useCallback((direction, number) => {
    setCorrectAnswers((prev) => {
      const newCorrectAnswers = new Set(prev);
      newCorrectAnswers.add(`${direction}-${number}`);
      setScore(newCorrectAnswers.size * 10);
      return newCorrectAnswers;
    });
  }, []);
  const handleIncorrect = useCallback((direction, number) => {
    setCorrectAnswers((prev) => {
      const newCorrectAnswers = new Set(prev);
      newCorrectAnswers.delete(`${direction}-${number}`);
      setScore(newCorrectAnswers.size * 10);
      return newCorrectAnswers;
    });
  }, []);
  const handleSubmit = () => {
    const confirmation = window.confirm("Are you sure you want to submit your score?");
    if(confirmation) {
    setEndTime(Date.now());
    const playerName = prompt("Choose a legendary alias to etch your name on the leaderboard!");
    const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
    
    axios.post('http://localhost:3001/api/submit-score', {
      name: playerName,
      email: email,
      score: score,
      startTime: startTime
    }).then(() => {
      setIsScoreModalOpen(true);
      navigate('/leaderboard');
    }).catch(error => console.error('Error submitting score:', error));
  }
};
  const handleAboutClick = () => {
    setIsAboutOpen(true);
  };
  const handleCloseModal = () => {
    setIsAboutOpen(false);
    setIsScoreModalOpen(false);
  };
  const elapsedTime = Math.floor((endTime - startTime) / 1000); // Calculate elapsed time in seconds
  return (
    <div className="Page">
      <h1 className="Header">Crossword Puzzle</h1>
      <div className="Content">
        <div className="about-icon" onClick={handleAboutClick}>?</div>
        <div className="CrosswordWrapper">
          <Crossword
            data={data}
            ref={crossword}
            theme={{
              gridBackground: "#441151",
              cellBackground: "#F9EEFC",
              cellBorder: "#441151",
              textColor: "rgb(0,0,0)",
              numberColor: "rgba(0,0,0, 0.8)",
              focusBackground: "#FFBA08",
              highlightBackground: "#FFF3D6",
            }}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
            onCrosswordCorrect={() => setEndTime(Date.now())} // Stop timer when crossword is completed
          />
        </div>
      </div>
      <div className="Commands">
        <button className="Command" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={handleCloseModal} />
      <ScoreModal isOpen={isScoreModalOpen} score={score} onClose={handleCloseModal} elapsedTime={elapsedTime} />
    </div>
  );
}
export default CrosswordApp;
