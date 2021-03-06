// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

//Cors middleware
const cors = require('cors')
const corsOptions = {
  origin: 'https://afternoon-dawn-57178.herokuapp.com/',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(__dirname + '/dist/my-app/'));

//Require models
var db = require('./models/');

//Require routes
require('./routes/routes.js')(app);

const path = require('path');

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/my-app/index.html'));
});
  
// Starts the server to begin listening
// =============================================================
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
