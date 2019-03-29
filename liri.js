require("dotenv").config();

var keys = require("./assets/JS/keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

console.log(command); 