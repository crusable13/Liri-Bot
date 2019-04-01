require("dotenv").config();

var keys = require("./assets/JS/keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var command = process.argv[2];
var input = process.argv[3];
const request = require('request');


//TESTING LOG
//console.log();
///////////////


if (command === "concert-this") {
    var artist = input;
    concertSearch(artist);
    console.log("Found your concert")


} else if (command === "spotify-this-song") {

    var spotify = new Spotify(keys.spotify);
    var track;

    //check function makes sure that if you don't enter a song to search, it has a default, and if you do enter something then it will have its -'s replaced with spaces

    var check = function (str) {

        if (str === undefined) { track = "The Sign" }

        else {
            track = str.replace(/-/gi, " ");
        };
    }
    check(input);
    spotifySearch(track);

   
    console.log("This song sucks")
    

} else if (command === "movie-this") {
    var searchTerm = function () {
        if (input === undefined) { return "Mr. Nobody" }
        else {
            return input.replace(/-/gi, "+");
        };
    };
    movieSearch(searchTerm());
    console.log("I remeber this movie")


} else if (command === "do-what-it says") {
    console.log("I did what you said")
};

///console.log(command); 

function spotifySearch(song) {
    spotify
    .search({ type: 'track', query: song, limit: 1 })
    .then(function(response) {
        var songs = response.tracks.items;
        var artists = songs[0].artists[0].name;
        var trackName = songs[0].name;
        var preview = songs[0].preview_url;
        var trackAlbum = songs[0].album.name;
      console.log("Artist: " + artists);
      console.log("Title: " + trackName);
      console.log("Preview Link: " + preview)
      console.log("Album: " + trackAlbum);
    })
    .catch(function(err) {
        console.log(err)
        console.log("You had an error bud");
    });
}
function concertSearch(band) {
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                let venue = response.data[i].venue.name;
                let city = response.data[i].venue.city;
                let date = response.data[i].datetime.substring(0, 10);

                console.log("Concert #" + (i + 1) + ": " + venue + " in " + city + " on " + moment(date).format('MM/DD/YYYY'))
            }
            //console.log(response.data);
        }
    )
};
function movieSearch(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(

        function (response) {
            console.log("Title:     " + response.data.Title);
            console.log("Release Year:      " + response.data.Released);
            console.log("IMDB RATING:      " + response.data.imdbRating);
            //For some reason OMDB doesn't respond with the rotten tomatoes rating in my object. So I print the meta score instead
            console.log("Metascore:     " + response.data.Metascore);
            console.log("Country of Production:     " + response.data.Country);
            console.log("Language:      " + response.data.Language);
            console.log("Plot:      " + response.data.Plot);
            console.log("Actors:        " + response.data.Actors)
        }
    )
};