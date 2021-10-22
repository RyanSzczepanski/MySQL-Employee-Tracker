// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // {TODO: Add your MySQL password}
    password: 'password',
    database: 'employeetracker_db'
  },
  console.log(`Connected to the employeetracker_db database.`)
);

// Query database
db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
  });