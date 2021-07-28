INSERT INTO department (department_name)
VALUES ("ENGINEERING"),
       ("SALES"),
       ("LEGAL"),
       ("FINANCE");

INSERT INTO role (title, salary, department_id)
VALUES ("SOFTWARE ENGINEER", 500.000, 1),
       ("LEAD ENGINEER", 800.000, 1),
       ("SALESPERSON", 100.000, 2),
       ("LAWYER", 300.000, 3),
       ("LEGAL TEAM LEAD", 600.000, 3),
       ("ACCOUNT MANAGER", 200.000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 1, 2),
       ("Brittany", "Spears", 2, NULL),
       ("Ben", "Kissel", 3, 6),
       ("Tony", "Hawk", 4, 5),
       ("Conor", "Oberst", 5, NULL),
       ("Wolfgang", "Mozart", 6, NULL);
     