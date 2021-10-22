USE employeetracker_db;

INSERT INTO department (name)
VALUES
("Sales"),
("Engineering");

INSERT INTO role (title, salary, department_id) 
VALUES
  ("Lead Sales", 80000, 1),
  ("Junior Sales", 70000, 1),
  ("Lead Engineer", 90000, 2),
  ("Junior Engineer", 85000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("Taylah", "Conrad", 1, NULL),
  ("Harriett", "Drew", 2, 1),
  ("Betsy", "Schwartz", 2, 1),
  ("Christie", "Woolley", 3, NULL),
  ("Yassin", "Boyer", 4, 4);