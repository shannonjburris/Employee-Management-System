const inquirer = require('inquirer');
const db = require('./db/dbQueries');




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
        console.log(rows);
    })
}

viewRoles = () => {
    db.findAllRoles().then((rows) => {
        console.log(rows);
    })
    
}
// should I call init like this after every function?
viewEmployees = () => {
    db.findAllEmployees().then((rows) => {
        console.log(rows);
        init();
    })
}

addDepartment = () => {
    db.adderDepartment().then((rows) => {
        console.log(rows);
    })
}

viewEmployees();