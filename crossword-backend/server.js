// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// let leaderboard = [];

// // Endpoint to submit score
// app.post('/api/submit-score', (req, res) => {
//   const { name, email, score, startTime } = req.body;
//   const submissionTime = Date.now();

//   // Check if the email has already submitted a score
//   const existingSubmission = leaderboard.find(entry => entry.email === email);
//   if (existingSubmission) {
//     return res.status(400).json({ success: false, message: 'Email has already submitted a score.' });
//   }

//   leaderboard.push({ name, email, score, startTime, submissionTime });

//   // Print name, email, score, start time, and submission time to console
//   console.log(`Name: ${name}, Email: ${email}, Score: ${score}, Start Time: ${new Date(startTime).toISOString()}, Submission Time: ${new Date(submissionTime).toISOString()}`);

//   // Sorting logic
//   leaderboard.sort((a, b) => {
//     // Priority to score
//     if (b.score !== a.score) return b.score - a.score;

//     // Priority to time taken (shorter is better)
//     const timeTakenA = a.submissionTime - a.startTime;
//     const timeTakenB = b.submissionTime - b.startTime;
//     if (timeTakenA !== timeTakenB) return timeTakenA - timeTakenB;

//     // Priority to those who started first within 15 minutes
//     const fifteenMinutes = 15 * 60 * 1000;
//     if (a.startTime <= b.startTime && b.startTime - a.startTime <= fifteenMinutes) return -1;
//     if (b.startTime <= a.startTime && a.startTime - b.startTime <= fifteenMinutes) return 1;

//     return a.startTime - b.startTime; // Otherwise, earlier start time is better
//   });

//   res.json({ success: true });
// });

// // Endpoint to get leaderboard
// app.get('/api/leaderboard', (req, res) => {
//   res.json(leaderboard);
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });






const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());
let leaderboard = [];
// Endpoint to submit score
app.post('/api/submit-score', (req, res) => {
  const { name, email, score, startTime } = req.body;
  const submissionTime = Date.now();
  leaderboard.push({ name, email, score, startTime, submissionTime });
  
  // Print name, email, score, start time, and submission time to console
  console.log(`Name: ${name}, Email: ${email}, Score: ${score}, Start Time: ${new Date(startTime).toISOString()}, Submission Time: ${new Date(submissionTime).toISOString()}`);
  
  // Sorting logic
  leaderboard.sort((a, b) => {
    // Priority to score
    if (b.score !== a.score) return b.score - a.score;
    // Priority to time taken (shorter is better)
    const timeTakenA = a.submissionTime - a.startTime;
    const timeTakenB = b.submissionTime - b.startTime;
    if (timeTakenA !== timeTakenB) return timeTakenA - timeTakenB;
    // Priority to those who started first within 15 minutes
    const fifteenMinutes = 15 * 60 * 1000;
    if (a.startTime <= b.startTime && b.startTime - a.startTime <= fifteenMinutes) return -1;
    if (b.startTime <= a.startTime && a.startTime - b.startTime <= fifteenMinutes) return 1;
    return a.startTime - b.startTime; // Otherwise, earlier start time is better
  });
  
  res.json({ success: true });
});
// Endpoint to get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

