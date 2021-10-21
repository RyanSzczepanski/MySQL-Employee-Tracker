DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;
USE employeetracker_db;

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role),
    REFERENCES role(id),
    FOREIGN KEY (manager),
    REFERENCES manager(id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id INTEGER,
    FOREIGN KEY (department),
    REFERENCES department(id)
);

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);