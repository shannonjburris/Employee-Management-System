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
VALUES ("Bob", "Smith", 1, 3000),
       ("Britany", "Spears", 2, 4000),
       ("Ben", "Kissel", 3, 5000),
       ("Tony", "Hawk", 4, NULL),
       ("Conor", "Oberst", 5, 6000),
       ("Wolfgang", "Mozart", 6, NULL);
     