INSERT INTO department (department_name)
VALUES ("ENGINEERING"),
       ("SALES"),
       ("LEGAL"),
       ("FINANCE");

INSERT INTO role (id, title, salary, department_id)
VALUES (10, "SOFTWARE ENGINEER", 500.000, 1),
       (11, "LEAD ENGINEER", 800.000, 1),
       (12, "SALESPERSON", 100.000, 2),
       (13, "LAWYER", 300.000, 3),
       (14, "LEGAL TEAM LEAD", 600.000, 3),
       (15, "ACCOUNT MANAGER", 200.000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (100, "Bob", "Smith", 10, 1);
     