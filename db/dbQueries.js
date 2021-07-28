const connection = require('./connection');
class DB {
    constructor(connection){
        this.connection = connection
    }
    findAllDepartments (){
        return this.connection.query(
        "SELECT * FROM department;"
        )
    }
    // check this prepared statments
    findAllRoles (){
        return this.connection.query(
            "SELECT role.title, role.salary, role.id, department.department_name FROM role INNER JOIN department WHERE role.department_id = department.id"
        )
    }
    findAllEmployees (){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;")
    }
    adderDepartment (department){
        return this.connection.query(
        "INSERT into department (department_name) VALUES ('" + department + "');"
        )
    }
    adderRole (info){
        // using let for readability
        let roleName = info.roleName;
        let salary = info.salary;
        let departmentName = info.roleDepartment;
        return this.connection.query(
            "INSERT into role (title, salary, department_id) VALUES ('" + roleName + "', '" + salary + "', (select id from department where department_name='" + departmentName + "'));"
        )
    }
    adderEmployee (info) {
         // using let for readability
        let employeeFirstName = info.employeeFirstName;
        let employeeLastName 	= info.employeeLastName;
        let employeeRole 			= info.employeeRole;
        let employeeManager 	= info.employeeManager;
				let managerID = this.connection.query(
            "SELECT id FROM employee WHERE last_name='" + employeeManager + "';"
        ).then((id) => {
					managerID = parseInt(id[0].id);
					return this.connection.query(
							"INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('" + employeeFirstName + "', '" + employeeLastName + "', (select id from role where title='" + employeeRole + "'), '" + managerID + "');"
					)
				})
    }
    updateEmployee () {
        return this.connection.query(
            // I am prompted to select an employee to update and their new role and this information is updated in the database
        )
    }
}
module.exports = new DB(connection);