// Node packages and variable definitions

require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var inquirer = require("inquirer");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// Prompt for users to input their name, and choose what function they want to run.

inquirer
  .prompt([
    {
      type: "input",
      message: "What's your name, stranger?",
      name: "userName"
    },
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Search for music",
        "Search for concerts",
        "Search for movies",
        "Use random.txt to do a search",
        "None of the above! Get me out of here!"
      ],
      name: "userChoice"
    }
  ])

  // Functions for the different choices that can be made.

  .then(function(inquirerResponse) {
    // Handler in case the user doesn't input a name.

    if (inquirerResponse.userName === "") {
      console.log(
        "\nMysterious one, are you? Guess I'll stick to calling you Stranger.\n"
      );
      inquirerResponse.userName = "Stranger";
    }

    var userName = inquirerResponse.userName;

    // Music search, using Spotify API.

    if (inquirerResponse.userChoice === "Search for music") {
      function music() {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What song would you like to search for, " + userName + "?",
              name: "songName"
            }
          ])
          .then(function(inquirerResponse) {
            if (inquirerResponse.songName === "") {
              inquirerResponse.songName = "The Sign";
            }
            spotify.search(
              { type: "track", query: inquirerResponse.songName },
              function(err, data) {
                if (err) {
                  return console.log("Error occurred: " + err);
                } else {
                  //  for(i=0; i < data.tracks.items.length; i++)
                  // console.log(data.tracks.items[0].artists[0].name)
                  console.log(
                    "\nArtist: " + data.tracks.items[0].artists[0].name
                  );
                  console.log("\nSong Name: " + data.tracks.items[0].name);
                  if (data.tracks.items[0].preview_url === null) {
                    console.log("\nPreview: Not available. :<");
                  } else {
                    console.log(
                      "\nPreview: " + data.tracks.items[0].preview_url
                    );
                  }
                  console.log("\nAlbum: " + data.tracks.items[0].album.name);
                }
              }
            );
          });
      }
      music();

      // Concert search, using BandsInTown
    }
    if (inquirerResponse.userChoice === "Search for concerts") {
      function concert() {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "Whose concerts would you like to search for, " +
                userName +
                "?",
              name: "bandName"
            }
          ])
          .then(function(inquirerResponse) {
            if (inquirerResponse.bandName === "") {
              console.log("You need to enter a band name, " + userName + ".");
            }
            axios
              .get(
                "https://rest.bandsintown.com/artists/" +
                  inquirerResponse.bandName +
                  "/events?app_id=codingbootcamp"
              )
              .then(function(response) {
                if (response.data.length < 1) {
                  console.log(
                    "\nI'm sorry, we couldn't find any concerts for " +
                      inquirerResponse.bandName +
                      ". :<"
                  );
                } else {
                  console.log(
                    "\nHere is a list of upcoming concerts featuring " +
                      inquirerResponse.bandName +
                      ":"
                  );
                  console.log("\n---------------------------");
                  for (i = 0; i < response.data.length; i++) {
                    console.log("\nVenue: " + response.data[i].venue.name);
                    console.log(
                      "\nLocation: " +
                        response.data[i].venue.city +
                        ", " +
                        response.data[i].venue.country +
                        "."
                    );
                    console.log("\nDate: " + response.data[i].datetime);
                    console.log("\n---------------------------");
                  }
                }
              });
          });
      }
      concert();
    }

    // Movie search, using OMDB API

    if (inquirerResponse.userChoice === "Search for movies") {
      function movie() {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What movie would you like to search for, " + userName + "?",
              name: "movieName"
            }
          ])
          .then(function(inquirerResponse) {
            if (inquirerResponse.movieName === "") {
              inquirerResponse.movieName = "Mr. Nobody";
            }
            axios
              .get(
                "http://www.omdbapi.com/?t=" +
                  inquirerResponse.movieName +
                  "&y=&plot=short&apikey=trilogy"
              )
              .then(function(response) {
                console.log(
                  "\nThis title of the movie is: " + response.data.Title
                );
                console.log("\nIt was released in: " + response.data.Year);
                console.log(
                  "\nIts IMDB rating is: " + response.data.imdbRating
                );
                console.log(
                  "\nIts Rotten Tomatoes rating is: " +
                    response.data.Ratings[1].Value
                );
                console.log("\nIt was produced in: " + response.data.Country);
                console.log("\nIts language is: " + response.data.Language);
                console.log("\nPlot: " + response.data.Plot);
                console.log("\nStarring: " + response.data.Actors);
              })
              .catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
          });
      }
      movie();
    }

    if (inquirerResponse.userChoice === "Use random.txt to do a search") {
      console.log("Dummy text");
    }

    // Exit option for those that don't want to run any searches.

    if (
      inquirerResponse.userChoice === "None of the above! Get me out of here!"
    ) {
      console.log(
        "\nSuit yourself, " + userName + ". Come back if you change your mind!"
      );
    }
  });
