"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Run server to listen on port 3005.
const server = app.listen(3005, () => {
  console.log('listening on *:3005');
});

const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static('static'));

// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Set Express routes.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
  
  // Disable this and add your real traffic
  autoGenerate();
});

function autoGenerate() {
   var random_time = Math.random() * 1000;
   setTimeout(function () {
    sendTraffic((Math.random() * 360) - 180, (Math.random() * 180) - 90)
        autoGenerate();
   }, random_time);
}

function sendTraffic(lng, lat) {
        io.emit("event", {lng: lng, lat: lat})
}
