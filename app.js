const inquirer = require('inquirer');
const db = require('./database/connection')

const MainChocies = {
    type: 'list',
    message: 'Choose what you would like to do.',
    name: 'choice',
    choices: [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add Departments',
    'Add Roles',
    'Add Employees',
    'Update Employee\'s Role',
    'Exit',
    ]
}

const mainInquirer = () =>{
    inquirer.prompt(MainChocies)
    .then((result) => {
        switch(result.choice) {
            case 'View All Departments':
                viewAllDepartments();
                break
            case 'View All Roles':
                viewAllRoles();
                break
            case 'View All Employees':
                viewAllEmployees();
                break
            case 'Add Departments':
                addDepartment();
                break
            case 'Add Roles': 
                addRole();
                break
            case 'Add Employees':
                addEmployee();
                break
            case 'Update Employee\'s Role':
                updateRole();
                break
            case 'Exit':
                exit();
        }    
    });
}

const viewAllDepartments = () => {
    const sql = `select * from department`;
    db.query(sql, (err, res) =>{
        if(err) throw err;
        console.table(res);
        mainInquirer();
    })
}

const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name as "Department"
    FROM role
    INNER JOIN department ON role.department_id = department.id
    `;
    db.query(sql, (err, res) =>{
        if(err) throw err;
        console.table(res);
        mainInquirer();
    })
}

const viewAllEmployees = () => {
    const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name as "Department", Manager.first_name as "Manager"
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee Manager ON employee.manager_id = Manager.id
    `;
    db.query(sql, (err, res) =>{
        if(err) throw err;
        console.table(res);
        mainInquirer();
    })
}

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Name of new department',
        name: 'name'
    })
    .then((result) => {
        db.query(`INSERT INTO department SET ?`, {
            name: result.name
        },
        (err) => {
            if(err) throw err;
            console.log(`Created department ${result.name}`);
            mainInquirer();
        })
    })
} 

const addRole = () => {
    const sql = `SELECT department.name, department.id FROM department`;
    db.query(sql, (err, res) => {
        inquirer.prompt([{
            type: 'input',
            message: 'Name of new role',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Salary of new role',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does this role belong to',
            name: 'choice',
            choices: () => {
                let choices = [];
                for (let i = 0; i < res.length; i++){
                    choices.push(res[i].name);
                }
                return choices;
            }
        }]).then((result) => {

            let department = result.choice;
            let department_id;
            for (let i = 0; i < res.length; i++){
                if (res[i].name == result.choice){
                    department_id = res[i].id;
                }
            }
            db.query("INSERT INTO role SET ?", {
                title: result.title,
                salary: result.salary,
                department_id: department_id,
            },
            (err) => {
                if(err) throw err;
                console.log(`Created Role ${result.name}`);
                mainInquirer();
            })
        })
    })
} 

const addEmployee = () => {
    const sql = `SELECT role.title, role.id FROM role`;
    db.query(sql, (err, res) => {
        inquirer.prompt([{
            type: 'input',
            message: "Employee's first name",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "Employee's last name",
            name: 'last_name'
        },
        {
            type: 'list',
            message: "What is the employee's role",
            name: 'choice',
            choices: () => {
                let choices = [];
                for (let i = 0; i < res.length; i++){
                    choices.push(res[i].title);
                }
                return choices;
            }
        }]).then((result) => {
            let role = result.choice;
            let role_id = result.choice;
            for(let i = 0; i < res.length; i++){
                if (res[i].title == result.choice){
                    role_id = res[i].id;
                }
            }
            db.query(`INSERT INTO employee SET ?`, {
                first_name: result.first_name,
                last_name: result.last_name,
                role_id: role_id,
            },
            (err) => {
                if(err) throw err;
                console.log(`Created Employee ${result.first_name} ${result.last_name}`);
                mainInquirer();
            })
        })
    })
} 

const updateRole = () => {
    const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name as "Department"
    FROM employee
    INNER JOIN role ON employee.role_id = role_id
    INNER JOIN department ON role.department_id = department.id
    `;
    db.query(sql, (err, res) => {
        if(err) throw err;

        inquirer.prompt({
            type: 'list',
            message: 'Choose and employee to update',
            name: 'employee',
            choices: () => {
                let choices = [];
                for (let i = 0; i < res.length; i++){
                    choices.push(`${res[i].first_name} ${res[i].last_name}`);
                }
                return choices;
            }
        }).then((result) => {
            const sql = `SELECT role.title, role.id, role.salary FROM role`;
            db.query(sql, (err, res) => {
                if (err) throw err;
                inquirer.prompt({
                    type: "list",
                    name: "role",
                    message: "Which role would you like to select",
                    choices: () => {
                        let choices = [];
                        for (let i = 0; i < res.length; i++){
                            choices.push(res[i].title);
                        }
                        return choices;
                    }
                }).then((newResult) => {
                    let role_id, employee_id;
                    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`;
                    db.query(sql, (err, res) => {
                        if(err) throw err;
                        for (let i = 0; i < res.length; i++){
                            if(`${res[i].first_name} ${res[i].last_name}` == newResult.choice){
                                employee_id = res[i].id
                            }
                        }
                        const sql = `SELECT role.title, role.salary, role.id FROM role`;
                        db.query(sql, (err, res) => {
                            if(err) throw err;
                            for (let i = 0; i < res.length; i++){
                                if(res[i].title == newResult.choice){
                                    role_id = res[i].id
                                }
                            }
                            const sql = `UPDATE employee SET ? WHERE ?`;
                            const params = [{role_id: role_id}, {id: employee_id}]
                            db.query(sql, params, (err) => {
                                if(err) throw err;
                                console.log("Employee's role has been updated")
                                mainInquirer();
                            })
                        })
                    })
                })
            })
        })
    })
}

const exit = () => {
    db.end();
}

mainInquirer();