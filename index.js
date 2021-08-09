const inquirer = require("inquirer");
const fs = require("fs");
var generate = require("./utils/generateMarkdown");
var axios = require("axios");

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the Title of your work?",
    },
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your e-mail address?",
    },
    {
        type: "input",
        name: "description",
        message: "Give me a quick description of your work",
    },
    {
        type: "input",
        name: "installation",
        message: "Any installation insttructions on this bad boi?",
    },
    {
        type: "input",
        name: "usage",
        message: "Provide some usage info",
    },
    {
        type: "input",
        name: "contribution",
        message: "Any contributors?",
    },
    {
        type: "input",
        name: "testing",
        message: "How would one go about testing your work?",
    },
    {
        type: "list",
        name: "license",
        message: "Chose the appropriate license for this project: ",
        choices: [
            "Apache",
            "Academic",
            "GNU",
            "ISC",
            "MIT",
            "Mozilla",
            "Open"
        ]
    },
];

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("Oh that new README was cooked up right nice for you!");
          });
        });

});

function init() {

}

init();

// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

// WHEN I enter my project title
// THEN this is displayed as the title of the README

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README