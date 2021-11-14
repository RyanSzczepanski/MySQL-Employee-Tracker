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

// const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name as "Department", Manager.first_name as "Manager"
//     FROM employee
//     LEFT JOIN role ON employee.role_id = role.id
//     LEFT JOIN department ON role.department_id = department.id
//     LEFT JOIN employee Manager ON employee.manager_id = Manager.id
//     `;
//   db.query(sql, function (err, results) {
//     console.log(results);
//   });

module.exports = db;