const express = require('express');
const path = require('path');
// const teamsRoute = require('./routes/teams')
// const playersRoute = require('./routes/players')
const apiRouter = require('./api/proxy')
// const playerProfile = require('./routes/playerProfile')
require('dotenv').config()
const app = express();
// a test route to make sure we can reach the backend
//this would normally go in a routes file
app.get('/test', (req, res) => {
    res.send('Welcome to the backend!')
})

app.use(express.static(path.join('/client/build')));

// app.use('/profile', playerProfile);
app.use('/api', apiRouter)
// app.use('/players', playersRoute);
// app.use('/teams', teamsRoute);
console.log(__dirname)
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    // app.use(express.static(path.join(__dirname + '/client/build')));
        
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join('/client/build/index.html'));
    });
}

//Set the port that you want the server to run on
const port = process.env.PORT || 3030;
app.listen(port);
console.log('App is listening on port ' + port);