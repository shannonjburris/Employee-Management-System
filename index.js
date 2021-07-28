const inquirer = require('inquirer');
const {
  adderDepartment,
  updateEmployee
} = require('./db/dbQueries');
const db = require('./db/dbQueries');


let departments = [];
let employees = [];
let roles = [];

// inquirer prompt
// switch case for whatever option user picks
init = () => {

  db.findAllDepartments().then((rows) => {
    rows.forEach(department => {
      departments.push(department.department_name);
    })
  })

  db.findAllRoles().then((rows) => {
    rows.forEach(role => {
      roles.push(role.title);
    })
  })

  db.findAllEmployees().then((rows) => {
    rows.forEach(employee => {
      employees.push(employee.last_name);
    })
  })

  inquirer
    .prompt([{
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
      }
      // do I need values behind all the function calls?
    ]).then((answers) => {
      
      switch (answers.userChoice) {
        case 'view all departments':
          viewDepartments(answers);
          break;
        case 'view all roles':
          viewRoles(answers);
          break;
        case 'view all employees':
          viewEmployees(answers);
          break;
        case 'add a department':
          addDepartment(answers);
          break;
        case 'add a role':
          addRole(answers);
          break;
        case 'add an employee':
          addEmployee(answers);
          break;
        case 'update an employee role':
          updateAnEmployee(answers);
          break;

        default:
          break;
      }
    });
}

viewDepartments = () => {
  db.findAllDepartments().then((rows) => {
    console.table(rows);
    departments = [];
    rows.forEach(department => {
      departments.push(department.department_name);
    })
    init();
  })
}

viewRoles = () => {
  db.findAllRoles().then((rows) => {
    console.table(rows);
    roles = [];
    rows.forEach(role => {
      roles.push(role.title);
    })
    init();
  })
}

viewEmployees = () => {
  db.findAllEmployees().then((rows) => {
    console.table(rows);
    employees = [];
    rows.forEach(employee => {
      employees.push(employee.last_name);
    })
    init();
  })
}

addDepartment = () => {
  inquirer
    .prompt([{
      type: 'input',
      name: 'newDepartmentName',
      message: 'What department do you want to add?'
    }]).then((answers) => {
      db.adderDepartment(answers.newDepartmentName);
      console.log('Department Added!');
      init();
    });
}

addRole = () => {
  inquirer
    .prompt([{
        type: 'input',
        name: 'roleName',
        message: 'What role do you want to add?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role?'
      },
      {
        type: 'list',
        name: 'roleDepartment',
        message: 'What department should the role be added to?',
        choices: departments
      }
    ]).then((answers) => {
      
      db.adderRole(answers);
  
      console.log('Role Added!');
      init();
    });

}

addEmployee = () => {
  inquirer
    .prompt([{
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the employees first name?',
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the employees last name?',
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employees role?',
        choices: roles
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the employees manager?',
        choices: employees
      }
    ]).then((answers) => {
      db.adderEmployee(answers);
      console.log('Employee Added!');
      init();
    })
};

updateAnEmployee = () => {
  inquirer
    .prompt([{
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: employees
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role would you like them to change to?',
        choices: roles
      }
    ]).then((answers) => {
			let employee = answers.employee;
			let role		 = answers.role;
      db.updateEmployee(employee, role);
      init();
    })
};

init();