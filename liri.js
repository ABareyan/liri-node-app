require("dotenv").config();

var keys = require("./keys.js");

var userInput = process.argv.slice(3).join('+');

var userChoice = process.argv[2];

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var inquirer = require("inquirer");


function result() {

    if (userInput !== "") {

        var appendUserinput = process.argv.slice(3).join(' ').toUpperCase();

        fs.appendFile("log.txt", "User input is: " + appendUserinput + '\n--------------------------\n', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    switch (userChoice) {

        case "concert-this":

            var request = require('request')

            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

            var moment = require('moment');

            var userInputCap = process.argv.slice(3).join(' ').toUpperCase();

            request(queryURL, function(error, response, body) {

                var data = JSON.parse(body);

                console.log('===================================\n\n' + userInputCap + '\n\n===================================');

                inquirer.prompt([{
                    type: "list",
                    name: "count",
                    message: "How Many Venues Do You Want To See?",
                    choices: ["First 1", "Any 1", "First 5", "Any 5", "All"]
                }]).then(function(quantity) {

                    if (quantity.count === "First 1") {
                        console.log('\n\nVenue name: ' + data[0].venue.name + '\n--------------------');
                        if (data[0].venue.region === '') {
                            console.log('Venue location\nCountry: ' + data[0].venue.country + '\nCity: ' + data[0].venue.city + '\n--------------------');
                        } else console.log('Venue location\nCountry: ' + data[0].venue.country + '\nRegion: ' + data[0].venue.region + '\nCity: ' + data[0].venue.city + '\n--------------------');

                        var date = data[0].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log('Date: ' + date + '\n==================');

                    }
                    if (quantity.count === "Any 1") {
                        var randomOne = Math.floor(Math.random() * (data.length + 1));

                        console.log('\n\nVenue name: ' + data[randomOne].venue.name + '\n--------------------');

                        if (data[randomOne].venue.region === '') {
                            console.log('Venue location\nCountry: ' + data[randomOne].venue.country + '\nCity: ' + data[randomOne].venue.city + '\n--------------------');
                        } else console.log('Venue location\nCountry: ' + data[randomOne].venue.country + '\nRegion: ' + data[randomOne].venue.region + '\nCity: ' + data[randomOne].venue.city + '\n--------------------');

                        var date = data[randomOne].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log('Date: ' + date + '\n==================');

                    }
                    if (quantity.count === "First 5") {
                        data.length = 5;
                        for (var i = 0; i < data.length; i++) {
                            console.log('\n\nVenue name: ' + data[i].venue.name + '\n--------------------');

                            if (data[i].venue.region === '') {
                                console.log('Venue location\nCountry: ' + data[i].venue.country + '\nCity: ' + data[i].venue.city + '\n--------------------');
                            } else console.log('Venue location\nCountry: ' + data[i].venue.country + '\nRegion: ' + data[i].venue.region + '\nCity: ' + data[i].venue.city + '\n--------------------');

                            var date = data[i].datetime;
                            date = moment(date).format("MM/DD/YYYY");
                            console.log('Date: ' + date + '\n==================');
                        }
                    }

                    if (quantity.count === "Any 5") {
                        var array = [];
                        for (var i = 0; i < 5; i++) {

                            var randomFive = Math.floor(Math.random() * (data.length + 1));

                            if (!array.includes(randomFive)) {

                                console.log('\n\nVenue name: ' + data[randomFive].venue.name + '\n--------------------');

                                if (data[randomFive].venue.region === '') {
                                    console.log('Venue location\nCountry: ' + data[randomFive].venue.country + '\nCity: ' + data[randomFive].venue.city + '\n--------------------');
                                } else console.log('Venue location\nCountry: ' + data[randomFive].venue.country + '\nRegion: ' + data[randomFive].venue.region + '\nCity: ' + data[randomFive].venue.city + '\n--------------------');

                                var date = data[randomFive].datetime;
                                date = moment(date).format("MM/DD/YYYY");
                                console.log('Date: ' + date + '\n==================');
                                array.push(randomFive);

                            } else i--;

                        }
                    }
                    if (quantity.count === "All") {

                        for (var i = 0; i < data.length; i++) {
                            console.log('\n\nVenue name: ' + data[i].venue.name + '\n--------------------');

                            if (data[i].venue.region === '') {
                                console.log('Venue location\nCountry: ' + data[i].venue.country + '\nCity: ' + data[i].venue.city + '\n--------------------');
                            } else console.log('Venue location\nCountry: ' + data[i].venue.country + '\nRegion: ' + data[i].venue.region + '\nCity: ' + data[i].venue.city + '\n--------------------');

                            var date = data[i].datetime;
                            date = moment(date).format("MM/DD/YYYY");
                            console.log('Date: ' + date + '\n==================');
                        }
                    }

                });

            });
            break;


        case "spotify-this-song":

            if (userInput === "") {
                userInput = "The Sign Ace of Base.";
            }

            spotify.search({ type: 'track', query: userInput }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }

                var song = data.tracks.items;

                inquirer.prompt([{
                    type: "list",
                    name: "count",
                    message: "How Many Songs Do You Want To See?",
                    choices: ["First 1", "Any 1", "First 5", "Any 5", "All"]
                }]).then(function(quantity) {
                    if (quantity.count === "First 1") {
                        if (song[0].preview_url === null) {
                            console.log('\n========================\nArtist(s): ' + song[0].album.artists[0].name +
                                "\n------------------------\nThe song's name: " + song[0].name +
                                '\n------------------------\nThe album name: ' + song[0].album.name +
                                '\n========================\n');
                        } else {
                            console.log('\n========================\nArtist(s): ' + song[0].album.artists[0].name +
                                "\n------------------------\nThe song's name: " + song[0].name +
                                '\n------------------------\nA preview link: ' + song[0].preview_url +
                                '\n------------------------\nThe album name: ' + song[0].album.name +
                                '\n========================\n');
                        }
                    }
                    if (quantity.count === "Any 1") {
                        var randomOne = Math.floor(Math.random() * (song.length + 1));
                        if (song[randomOne].preview_url === null) {
                            console.log('\n========================\nArtist(s): ' + song[randomOne].album.artists[0].name +
                                "\n------------------------\nThe song's name: " + song[randomOne].name +
                                '\n------------------------\nThe album name: ' + song[randomOne].album.name +
                                '\n========================\n');
                        } else {
                            console.log('\n========================\nArtist(s): ' + song[randomOne].album.artists[0].name +
                                "\n------------------------\nThe song's name: " + song[randomOne].name +
                                '\n------------------------\nA preview link: ' + song[randomOne].preview_url +
                                '\n------------------------\nThe album name: ' + song[randomOne].album.name +
                                '\n========================\n');
                        }
                    }
                    if (quantity.count === "First 5") {

                        for (var i = 0; i < 5; i++) {
                            if (song[i].preview_url === null) {
                                console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                    "\n------------------------\nThe song's name: " + song[i].name +
                                    '\n------------------------\nThe album name: ' + song[i].album.name +
                                    '\n========================\n');
                            } else {
                                console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                    "\n------------------------\nThe song's name: " + song[i].name +
                                    '\n------------------------\nA preview link: ' + song[i].preview_url +
                                    '\n------------------------\nThe album name: ' + song[i].album.name +
                                    '\n========================\n');
                            }
                        }
                    }

                    if (quantity.count === "Any 5") {

                        var array = [];

                        for (var i = 0; i < 5; i++) {
                            var randomFive = Math.floor(Math.random() * (song.length + 1));

                            if (!array.includes(randomFive)) {
                                if (song[i].preview_url === null) {
                                    console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                        "\n------------------------\nThe song's name: " + song[i].name +
                                        '\n------------------------\nThe album name: ' + song[i].album.name +
                                        '\n========================\n');
                                } else {
                                    console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                        "\n------------------------\nThe song's name: " + song[i].name +
                                        '\n------------------------\nA preview link: ' + song[i].preview_url +
                                        '\n------------------------\nThe album name: ' + song[i].album.name +
                                        '\n========================\n');
                                    array.push(randomFive);
                                }
                            } else i--;
                        }
                    }

                    if (quantity.count === "All") {
                        for (var i = 0; i < song.length; i++) {

                            if (song[i].preview_url === null) {
                                console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                    "\n------------------------\nThe song's name: " + song[i].name +
                                    '\n------------------------\nThe album name: ' + song[i].album.name +
                                    '\n========================\n');
                            } else {
                                console.log('\n========================\nArtist(s): ' + song[i].album.artists[0].name +
                                    "\n------------------------\nThe song's name: " + song[i].name +
                                    '\n------------------------\nA preview link: ' + song[i].preview_url +
                                    '\n------------------------\nThe album name: ' + song[i].album.name +
                                    '\n========================\n');
                            }
                        }
                    }

                });

            });
            break;


        case "movie-this":

            var axios = require('axios');

            if (userInput === "") {
                userInput = 'Mr. Nobody'
            }

            var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";


            axios.get(queryURL).then(function(response) {
                    console.log('==============================\n');

                    console.log('Title: ' + response.data.Title + '\n--------------------' +
                        '\nCame out: ' + response.data.Year + '\n--------------------' +
                        '\nIMDB Rating: ' + response.data.imdbRating + '\n--------------------' +
                        '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value + '\n--------------------' +
                        '\nCountry: ' + response.data.Country + '\n--------------------' +
                        '\nLanguage: ' + response.data.Language + '\n--------------------' +
                        '\nPlot: ' + response.data.Plot + '\n--------------------' +
                        '\nActors: ' + response.data.Actors);
                    console.log('\n==============================\n');
                })
                .catch(function(error) {
                    if (error.response) {
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                        console.log("---------------Status---------------");
                        console.log(error.response.status);
                        console.log("---------------Status---------------");
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                    console.log(error.config);

                });
            break;

        case "do-what-it-says":

            fs.readFile("random.txt", "utf-8", function(err, data) {
                if (err) {
                    return console.log(err);
                }
                var output = data.split(',');

                userChoice = output[0];

                userInput = output[1];

                result();
            });
            break;
    };

}

result();