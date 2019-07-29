require("dotenv").config();

var keys = require("./keys.js");

var inquirer = require("inquirer");

var spotify = keys.spotify;

inquirer
    .prompt([
        {
            type:"input",
            message:"What's your name, stranger?",
            name:"userName"
        },
        {
            type:"list",
            message:"What would you like to do?",
            choices:["Search for music", "Search for concerts", "Search for movies", "None of the above! Get me out of here!"],
            name:"userChoice"
        }
    ])
    .then(function(inquirerResponse){
        
        if (inquirerResponse.userChoice === "Search for music"){
            function music(){
                inquirer
                    .prompt([
                        {
                            type:"input",
                            message:"What song would you like to search for, " + inquirerResponse.userName + "?",
                            name:"songName"
                        }
                    ])
                    .then(function(inquirerResponse){
                        console.log(inquirerResponse);
                    })
            }
            music();
        }
        if(inquirerResponse.userChoice === "Search for concerts"){
            function concert(){
                inquirer
                    .prompt([
                        {
                            type:"input",
                            message:"Whose concert would you like to search for, " + inquirerResponse.userName + "?",
                            name:"concertName"
                        }
                    ])
                    .then(function(inquirerResponse){
                        console.log(inquirerResponse);    
                    })
            }
            concert();
        }
        if(inquirerResponse.userChoice === "Search for movies"){
            function movie(){
                inquirer
                    .prompt([
                        {
                            type:"input",
                            message:"What movie would you like to search for, " + inquirerResponse.userName + "?",
                            name: "movieName"
                        }
                    ])
                    .then(function(inquirerResponse){
                        console.log(inquirerResponse);
                    })
            }
            movie();
        }
        if(inquirerResponse.userChoice === "None of the above! Get me out of here!"){
            console.log("\nSuit yourself, " + inquirerResponse.userName + ". Come back if you change your mind!");
        }
    })