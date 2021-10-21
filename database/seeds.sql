INSERT INTO department (id, name)
VALUES
(1, "Sales"),
(2, "Engineering");

INSERT INTO role (id, title, salary, department_id) 
VALUES
  (1, "Lead Sales", 80000, 1),
  (2, "Junior Sales", 70000, 1);
  (3, "Lead Engineer", 90000, 2);
  (4, "Junior Engineer", 85000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
  (1, "Taylah", "Conrad", 1, NULL),
  (2, "Harriett", "Drew", 2, 1),
  (3, "Betsy", "Schwartz", 2, 1),
  (4, "Christie", "Woolley", 3, NULL),
  (5, "Yassin", "Boyer", 4, 4);