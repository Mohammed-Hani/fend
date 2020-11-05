// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of an app
const app = express();

// dependencies
const bodyParser = require('body-parser');

// Configure express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

// Run the server
const SERVER = app.listen(port, listening);

function listening() {
    console.log('Server is running');
    console.log(`Running at port ${port}`);
}


// Post route
app.post('/addWeatherData', addWeather);

function addWeather(req, res) {
    projectData = req.body;
    res.send({});
}

// Get route
app.get('/getWeatherData', function (req, res) {
    res.send(projectData);
});