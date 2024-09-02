const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/createTables');
const XLSX = require('xlsx');
const router = express.Router();

const secretKey = 'your-secret-key';

// Hardcoded admin credentials
const adminCredentials = [
  { empId: 'admin1', password: bcrypt.hashSync('adminpassword1', 10) },
  { empId: 'admin2', password: bcrypt.hashSync('adminpassword2', 10) },
];

// Utility function to verify JWT and check admin authorization
const verifyAdmin = (authorizationHeader) => {
  if (!authorizationHeader) {
    throw new Error('Unauthorized: No token provided');
  }

  const token = authorizationHeader.split(' ')[1];
  const decoded = jwt.verify(token, secretKey);
  const admin = adminCredentials.find(admin => admin.empId === decoded.empId);

  if (!admin) {
    throw new Error('Unauthorized');
  }

  return admin;
};

// Admin login endpoint
router.post('/api/admin/login', (req, res) => {
  const { empId, password } = req.body;

  const admin = adminCredentials.find(admin => admin.empId === empId);
  if (admin && bcrypt.compareSync(password, admin.password)) {
    const token = jwt.sign({ empId }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }
});

// Admin settings fetch endpoint
router.get('/api/admin/settings', (req, res) => {
  try {
    verifyAdmin(req.headers.authorization);

    db.query('SELECT * FROM login_window WHERE id = 1', (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to fetch settings' });
      if (results.length > 0) {
        const { login_window_start_time, login_window_end_time, game_timer } = results[0];
        return res.json({ loginWindowStartTime: login_window_start_time, loginWindowEndTime: login_window_end_time, gameTimer: game_timer });
      } else {
        return res.status(404).json({ message: 'Settings not found' });
      }
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// Admin settings update endpoint
router.post('/api/admin/settings', (req, res) => {
  try {
    verifyAdmin(req.headers.authorization);

    const { loginWindowStartTime, loginWindowEndTime, gameTimer } = req.body;

    const updateQuery = `
      UPDATE login_window 
      SET login_window_start_time = ?, login_window_end_time = ?, game_timer = ?
      WHERE id = 1
    `;

    db.query(updateQuery, [loginWindowStartTime, loginWindowEndTime, gameTimer], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update settings' });
      return res.json({ loginWindowStartTime, loginWindowEndTime, gameTimer, message: 'Settings updated successfully' });
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// User login endpoint
router.post('/api/login', (req, res) => {
  const { empId } = req.body;

  db.query('SELECT * FROM login_window WHERE id = 1', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database query failed.' });
    if (results.length === 0) return res.status(500).json({ message: 'Login window settings not found.' });

    const { login_window_start_time, login_window_end_time } = results[0];
    const currentTime = new Date();

    const startTime = new Date(login_window_start_time);
    const endTime = new Date(login_window_end_time);

    if (currentTime < startTime || currentTime > endTime) {
      return res.status(400).json({ message: 'Login is not allowed at this time.', startTime: login_window_start_time, endTime: login_window_end_time });
    }

    db.query('SELECT * FROM employees WHERE emp_id = ?', [empId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Database query failed.' });
      if (result.length === 0) return res.status(401).json({ message: 'EmpID not found. You are not a valid user.' });

      const empName = result[0].emp_name;
      const token = jwt.sign({ empId, empName }, secretKey, { expiresIn: '1h' });
      return res.json({ token });
    });
  });
});

// Endpoint to fetch login window times and gameTimer
router.get('/api/login-times', (req, res) => {
  db.query('SELECT * FROM login_window WHERE id = 1', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database query failed.' });
    if (results.length === 0) return res.status(500).json({ message: 'Login window settings not found.' });

    const { login_window_start_time, login_window_end_time, game_timer } = results[0];
    return res.json({ startTime: login_window_start_time, endTime: login_window_end_time, gameTimer: game_timer });
  });
});

router.get('/api/leaderboard', (req, res) => {
  const empId = req.query.empId;
  
  if (!empId) {
    return res.status(400).json({ error: 'empId is required' });
  }

  console.log('Received empId:', empId);

  const query = 'SELECT * FROM leaderboard WHERE emp_id = ?';
  db.query(query, [empId], (err, results) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});


// Assuming you have the necessary imports and database setup as described previously

router.get('/api/leaderboard/all', (req, res) => {
  const query = `
    SELECT leaderboard.emp_id, employees.emp_name, leaderboard.score,
           FROM_UNIXTIME(leaderboard.start_time / 1000) AS start_time,
           FROM_UNIXTIME(leaderboard.end_time / 1000) AS end_time,
           leaderboard.time_taken
    FROM leaderboard
    JOIN employees ON leaderboard.emp_id = employees.emp_id
    ORDER BY leaderboard.score DESC, leaderboard.time_taken ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch leaderboard data:', err);
      return res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
    res.json(results);
  });
});

// Function to convert timestamp to MySQL DATETIME format
const formatForMySQL = (timestamp) => {
  if (typeof timestamp !== 'number') {
    throw new TypeError('Timestamp must be a number');
  }

  const date = new Date(timestamp);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Submit score endpoint
router.post('/api/submit-score', (req, res) => {
  const { empId, empName, score, startTime, endTime } = req.body;
  console.log('Received data:', { empId, empName, score, startTime, endTime });
  const formatTimestampForMySQL = (timestamp) => {
    if (typeof timestamp !== 'string') {
      timestamp = String(timestamp);
    }
    return timestamp;
  };
  
  try {
    // Store timestamps directly as strings
    const startTimeFormatted = formatTimestampForMySQL(startTime);
    const endTimeFormatted = formatTimestampForMySQL(endTime);

    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const query = `
      INSERT INTO leaderboard (emp_id, emp_name, score, start_time, end_time, time_taken)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [empId, empName, score, startTimeFormatted, endTimeFormatted, timeTaken], (err) => {
      if (err) {
        console.error('Failed to submit score:', err);
        return res.status(500).json({ message: 'Failed to submit score.' });
      }
      res.json({ message: 'Score submitted successfully!' });
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});




// API to get employee name by empId
router.get('/api/employee/:empId', (req, res) => {
  const empId = req.params.empId;

  // Query to fetch the employee name
  const query = 'SELECT emp_name FROM employees WHERE emp_id = ?';

  db.query(query, [empId], (err, result) => {
    if (err) {
      console.error('Failed to fetch employee name:', err);
      return res.status(500).json({ error: 'Failed to fetch employee name' });
    }

    if (result.length > 0) {
      res.json({ empName: result[0].emp_name });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });
});

// Endpoint to clear the leaderboard
router.post('/api/clear-leaderboard', (req, res) => {
  try {
    verifyAdmin(req.headers.authorization); // Ensure this is called to validate the token

    db.query('TRUNCATE TABLE leaderboard', (err) => {
      if (err) {
        console.error('Failed to clear leaderboard:', err);
        return res.status(500).json({ message: 'Failed to clear leaderboard.' });
      }
      res.json({ message: 'Leaderboard cleared successfully!' });
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// Route to download leaderboard as Excel
router.get('/api/download-leaderboard', (req, res) => {
  try {
    const query = `
      SELECT leaderboard.emp_id, employees.emp_name, leaderboard.score,
             FROM_UNIXTIME(leaderboard.start_time / 1000) AS start_time,
             FROM_UNIXTIME(leaderboard.end_time / 1000) AS end_time,
             leaderboard.time_taken
      FROM leaderboard
      JOIN employees ON leaderboard.emp_id = employees.emp_id
      ORDER BY leaderboard.score DESC, leaderboard.time_taken ASC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Failed to fetch leaderboard data:', err);
        return res.status(500).json({ error: 'Failed to fetch leaderboard data' });
      }

      // Convert results to Excel format
      const worksheet = XLSX.utils.json_to_sheet(results);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaderboard');

       // Generate buffer
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

       // Set response headers and send the buffer
       res.setHeader('Content-Disposition', 'attachment; filename="leaderboard.xlsx"');
       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
       res.send(excelBuffer);
     });
   } catch (error) {
     console.error('Failed to generate Excel:', error.message);
     res.status(500).json({ error: 'Failed to generate Excel file' });
   }
 });

module.exports = router;
