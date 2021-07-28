const inquirer = require('inquirer');
const { adderDepartment } = require('./db/dbQueries');
const db = require('./db/dbQueries');


let departments = [];
let employees = [];

// inquirer prompt 
// switch case for whatever option user picks
init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userChoice',
                message: 'What would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            }
            // do I need values behind all the function calls?
        ]).then((answers) => {
            console.log(answers);
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
                    updateEmployee(answers);
                    break;

                default:
                    break;
            }
        });
}

viewDepartments = () => {
    db.findAllDepartments().then((rows) => {
        console.table(rows);
        rows.forEach(department => {
            departments.push(department.department_name);
        })
        init();
    })
}

viewRoles = () => {
    db.findAllRoles().then((rows) => {
        console.table(rows);
        init();
    })
    
}

viewEmployees = () => {
    db.findAllEmployees().then((rows) => {
        console.table(rows);
        rows.forEach(employee => {
            employees.push(employee.last_name);
        })
        init();
    })
}

addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartmentName',
                message: 'What department do you want to add?'
            }
        ]).then((answers) => {
            db.adderDepartment(answers.newDepartmentName);
            viewDepartments();
            init();
        });    
}
    
addRole = () => {
    inquirer
    .prompt([
        {
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
        // console.log(answers);
        db.adderRole(answers);
        // viewRoles();
        init();
    });    

}

addEmployee = () => {
    inquirer
    .prompt([
        {
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
            type: 'input',
            name: 'employeeRole',
            message: 'What is the employees role?',
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the employees manager?',
            choices: employees
        }
    ]).then((answers) => {
        db.adderEmployee(answers);
        init();
    });    

}

init();