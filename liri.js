require("dotenv").config();

var keys = require("./keys.js");

var userInput = process.argv.slice(3).join('+');

var userChoice = process.argv[2];

console.log(userChoice);

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log(spotify);





function result() {
    switch (userChoice) {
        case "concert-this":
            var request = require('request')
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
            console.log(queryURL);

            request(queryURL, function(error, response, body) {

                var data = JSON.parse(body)
                var moment = require('moment');

                var userInputCap = process.argv.slice(3).join(' ').toUpperCase();

                console.log('===================================\n\n' + userInputCap + '\n\n===================================');


                for (var i = 0; i < data.length; i++) {
                    console.log('\n\nVenue name: ' + data[i].venue.name + '\n--------------------');

                    if (data[i].venue.region === '') {
                        console.log('Venue location\nCountry: ' + data[i].venue.country + '\nCity: ' + data[i].venue.city + '\n--------------------');
                    } else console.log('Venue location\nCountry: ' + data[i].venue.country + '\nRegion: ' + data[i].venue.region + '\nCity: ' + data[i].venue.city + '\n--------------------');

                    var date = data[i].datetime;
                    date = moment(date).format("MM/DD/YYYY");
                    console.log('Date: ' + date + '\n==================');



                }




                // console.log(data[2]);
                // console.log(date);


            });


            break;

        case "spotify-this-song":



            spotify.search({ type: 'track', query: userInput }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }

                var song = data.tracks.items


                console.log(song);
                console.log(song.length);


            });


            // console.log('this is loaded');


            break;


        case "movie-this":

            var axios = require('axios');

            var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

            console.log(queryURL + '\n');

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
            break;

    };

}

result();