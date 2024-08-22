const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3001;

const adminUsername = 'admin';
const adminPasswordHash = bcrypt.hashSync('adminpassword', 10); // Hashed password for admin
const secretKey = 'your-secret-key';

let leaderboard = [];
let gameSettings = {
  loginWindowStartTime: '', // Datetime
  loginWindowEndTime: '', // Datetime
  gameTimer: 10, // in minutes
};

app.use(bodyParser.json());
app.use(cors());

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Get game settings
app.get('/api/admin/settings', (req, res) => {
  res.json(gameSettings);
  console.log('Current Game Settings:');
  console.log(`Login Window Start Time: ${gameSettings.loginWindowStartTime}`);
  console.log(`Login Window End Time: ${gameSettings.loginWindowEndTime}`);
  console.log(`Game Timer: ${gameSettings.gameTimer} minutes`);
});

// Update game settings
app.post('/api/admin/settings', (req, res) => {
  const { loginWindowStartTime, loginWindowEndTime, gameTimer } = req.body;
  gameSettings.loginWindowStartTime = loginWindowStartTime;
  gameSettings.loginWindowEndTime = loginWindowEndTime;
  gameSettings.gameTimer = gameTimer;
  
  console.log('Updated Game Settings:');
  console.log(`Login Window Start Time: ${loginWindowStartTime}`);
  console.log(`Login Window End Time: ${loginWindowEndTime}`);
  console.log(`Game Timer: ${gameTimer} minutes`);

  res.status(200).json(gameSettings);
});

// Endpoint to submit score
app.post('/api/submit-score', (req, res) => {
  const { name, email, score, startTime } = req.body;
  const submissionTime = Date.now();
  
  // Add score submission logic with duplicate check
  const existingSubmission = leaderboard.find(entry => entry.email === email);
  if (existingSubmission) {
    return res.status(400).json({ success: false, message: 'Email has already submitted a score.' });
  }
  
  leaderboard.push({ name, email, score, startTime, submissionTime });
  
  // Sorting logic
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const timeTakenA = a.submissionTime - a.startTime;
    const timeTakenB = b.submissionTime - b.startTime;
    return timeTakenA - timeTakenB;
  });
  
  res.json({ success: true });
});

// Endpoint to get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Endpoint to download leaderboard as Excel
app.get('/api/download-leaderboard', (req, res) => {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(leaderboard);
  xlsx.utils.book_append_sheet(wb, ws, 'Leaderboard');

  const filePath = path.join(__dirname, 'leaderboard.xlsx');
  xlsx.writeFile(wb, filePath);
  res.download(filePath);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
