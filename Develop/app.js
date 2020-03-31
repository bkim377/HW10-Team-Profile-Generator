const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// ​const employeeQuestions = [
//     "What is the employee's name?",
//     "What is the employee's ID?",
//     "What is the employee's email?",
//     "What is the employee's role?"
// ];

const employeePrompts = [
    { type: "input",
      message: "What is the employee's name?",
      name: "name"
    },
    { type: "input",
      message: "What is the employee's ID?",
      name: "id"
    },
    { type: "input",
      message: "What is the employee's email?",
      name: "email",
      validate: function ValidateEmail(email) {
      var check = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (check) {
          return (true)
        }
          alert("Your email address is invalid!")
          return (false)
      }
    },
    { type: "list",
      message: "What is the employee's role?",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"]
    }
];

const managerPrompt = {
    type: "input",
    message: "Enter the manager's office number: ",
    name: "officeNumber"
}

const engineerPrompt = {
    type: "input",
    message: "Enter the engineer's GitHub username: ",
    name: "github"
}

const internPrompt = {
    type: "input",
    message: "Enter the intern's school: ",
    name: "school"
}

const moreEmployeesQuestion = {
    type: "confirm",
    message: "Would you like to add another employee?",
    name: "anotherEmployee", 
    default: false
}

function listmoreEmployees() {
    inquirer
    .prompt(moreEmployeesQuestion)
    .then(response => {
        if(response === true){
            memberQuestions();
        } 
        }).catch(error => {
            if (error) {
                throw error;
            }
            console.log("Error, please try again");
        });
      }



function memberQuestions(){
inquirer
.prompt(employeePrompts)
.then(response => {
    const {name, id, email} = response;
    let employee = new Employee(name, id, email);
    // console.log(employee);
    switch (response.role){
        case "Manager":
            inquirer
            .prompt(managerPrompt)
            .then(res => {
                const {officeNumber} = res;
                let manager = new Manager(name, id, email, officeNumber);
                console.log(manager);
                listmoreEmployees();
            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            });
            break;

        case "Engineer":
            inquirer
            .prompt(engineerPrompt)
            .then(res => {
                const {github} = res;
                let engineer = new Engineer(name, id, email, github);
                console.log(engineer);
                listmoreEmployees();
            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            });
            break;

        case "Intern":
            inquirer
            .prompt(internPrompt)
            .then(res => {
                const {school} = res;
                let intern = new Intern(name, id, email, school);
                console.log(intern);
                listmoreEmployees();
            })
            .catch(err => {
                if (err) {
                    throw err;
                }
            });
            break;
    }
})
.catch(error => {
    if (error) {
        throw error;
    }
    console.log("Error, please try again");
});
};

memberQuestions();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
