const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");


const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

var options = {
  format: "Letter"
};

//Module Imports
const Employee = require("./Employee.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");
const Manager = require("./Manager.js");
const generateHTML = require("./htmlRenderer.js");



// =============================================================


//Employees DATA
const employees = [];
const engineers = [];
const interns = [];
const managers = [];
let id = 0;
var response;

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Email:",
        name: "email"
      },
      {
        type: "list",
        name: "role",
        message: "What's Your Position At The Company?",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ])
    .then(function(data) {
      switch (data.role) {
        case "Manager":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "Enter office number: ",
                name: "office"
              }
            ])
            .then(function(res) {
              const officeNum = res.office;
              console.log(officeNum);
              const manager = new Manager(
                data.name,
                res.id,
                data.email,
                officeNum,
                "Manager"
              );
              console.log(manager);
              employees.push(manager);
            }).then(function(){
              addNext()
              });
          break;
        case "Engineer":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "Enter github username: ",
                name: "github"
              }
            ])
            .then(function(res) {
              const githubName = res.github;
              const engineer = new Engineer(
                data.name,
                res.id,
                data.email,
                githubName,
                "Engineer"
              );
              employees.push(engineer);
            }).then(function(){
              addNext()
              });
          break;
        case "Intern":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Enter employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "Enter school: ",
                name: "school"
              }
            ])
            .then(function(res) {
              const internSchool = res.school;
              const intern = new Intern(
                data.name,
                res.id,
                data.email,
                internSchool,
                "Intern"
              );
              employees.push(intern);
            }).then(function(){
              addNext()
              });
          break;
      }
    })
    .then(function() {
    });
};

const addNext = () => {
  inquirer
    .prompt([
      {
        type: "list",
      name: "add",
      message: "Would You Like To Add Another Employee?",
      choices: ["Yes", "No"]
      }
    ])
    .then(function(res) {
      if (res.add === "Yes") {
        promptUser();
      } else {
        console.log("Done");
        completedRoster(employees);
      }
    });
};

function completedRoster(employees){
    console.log("Success!");
    console.log(employees);
    const html = generateHTML(employees);
    console.log(html);
    writeFileAsync("./output/employees.html", html, "utf-8");
}

function init(){
  console.log("Please enter employee info")
  promptUser();
}

init();
