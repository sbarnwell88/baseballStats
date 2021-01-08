const express = require('express');
const path = require('path');
const teamsRoute = require('./routes/teams')
const playersRoute = require('./routes/players')
const app = express();
// a test route to make sure we can reach the backend
//this would normally go in a routes file
app.get('/test', (req, res) => {
    res.send('Welcome to the backend!')
})

app.use('/players', playersRoute);
app.use('/teams', teamsRoute);
//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);