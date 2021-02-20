// Access to this object from anywhere within the app
let projectData = {};
// Express to run server and routes
const express = require('express');
// Import body-parser into app
const bodyParser = require('body-parser');
// Cors for cross-origin resource sharing
const cors = require('cors');
// Start up an instance of app
const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;

/* Middleware */
/*
To handle HTTP POST body-parser extract the entire body portion of 
an incoming request stream and exposees it on req.body
 */
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use cors as middle-ware
app.use(cors());
// Serving static files of the main folder
app.use(express.static('public'));
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening() {
  console.log(`Server is running on localhost: ${port}`);
}

// Root route
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");
})

// GET route
app.get('/getData', getData);
// callback function sends back our weather data
function getData(req, res) {
  res.send(projectData);
}

// POST route
app.post('/addData', postData);
function postData(req, res) {
  projectData = req.body;
  res.send('POST received');
  console.log(projectData);
}
