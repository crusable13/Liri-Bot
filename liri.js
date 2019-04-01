require("dotenv").config();

var keys = require("./assets/JS/keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3];



//TESTING LOG
console.log("TEST LOG");
///////////////


if (command === "concert-this") {
    console.log("Found your concert")

    
} else if (command === "spotify-this-song") {
    console.log("This song sucks")


} else if (command === "movie-this") {
    var searchTerm = function() {
        if(input === undefined) { return "Mr. Nobody"}
    else{ return input.replace(/-/gi ,"+");}
    }
        movieSearch(searchTerm());
    console.log("I remeber this movie")


} else if (command === "do-what-it says"){
    console.log("I did what you said")
}

///console.log(command); 


function movieSearch(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(

    function(response) {
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
}