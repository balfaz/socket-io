const express = require('express');
const path = require('path');
require('dotenv').config();

// app di Express
const app = express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path Pubblico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log(`Servidor running port, `, process.env.PORT);
});
