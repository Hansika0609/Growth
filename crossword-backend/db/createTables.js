const mysql = require('mysql2');
const employees = require('../data/employees');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Growth9457@',
  database: 'game_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');

  // Create login_window table if it doesn't exist
  const createLoginWindowTable = `
    CREATE TABLE IF NOT EXISTS login_window (
      id INT AUTO_INCREMENT PRIMARY KEY,
      login_window_start_time DATETIME,
      login_window_end_time DATETIME,
      game_timer INT
    )
  `;

  db.query(createLoginWindowTable, (err, result) => {
    if (err) throw err;
    console.log('login_window table ensured to exist or created if not.');

    // Insert default settings if the table is empty
    const checkLoginWindowTable = 'SELECT COUNT(*) AS count FROM login_window';
    db.query(checkLoginWindowTable, (err, results) => {
      if (err) throw err;

      if (results[0].count === 0) {
        const insertDefaultSettings = `
          INSERT INTO login_window (login_window_start_time, login_window_end_time, game_timer)
          VALUES (NOW(), NOW() + INTERVAL 1 HOUR, 10)
        `;
        db.query(insertDefaultSettings, (err, result) => {
          if (err) throw err;
          console.log('Default settings inserted into login_window table.');
        });
      }
    });
  });

  // Create employees table if it doesn't exist
  const createEmployeesTable = `
    CREATE TABLE IF NOT EXISTS employees (
      emp_id INT PRIMARY KEY,
      emp_name VARCHAR(255)
    )
  `;

  db.query(createEmployeesTable, (err, result) => {
    if (err) throw err;
    console.log('employees table ensured to exist or created if not.');

    // Insert employee data if the table is empty
    const checkEmployeesTable = 'SELECT COUNT(*) AS count FROM employees';
    db.query(checkEmployeesTable, (err, results) => {
      if (err) throw err;

      if (results[0].count === 0) {
        const insertEmployeesQuery = 'INSERT INTO employees (emp_id, emp_name) VALUES ?';
        db.query(insertEmployeesQuery, [employees], (err, result) => {
          if (err) throw err;
          console.log('Employee data inserted:', result.affectedRows);
        });
      } else {
        console.log('Employee data already exists in the employees table.');
      }
    });
  });

  // Create leaderboard table if it doesn't exist
  const createLeaderboardTable = `
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INT AUTO_INCREMENT PRIMARY KEY,
      emp_id INT,
      emp_name VARCHAR(255),
      score INT,
      start_time DATETIME,
      end_time DATETIME,
      time_taken INT,
      FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
    )
  `;

  db.query(createLeaderboardTable, (err, result) => {
    if (err) throw err;
    console.log('leaderboard table ensured to exist or created if not.');
  });
});

module.exports = db;
