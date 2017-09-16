const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CORS = require('cors');
const server = express();


const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/photo-site', { useMongoClient: true });

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(CORS());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});