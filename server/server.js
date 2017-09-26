const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cors = require('cors');
const server = express();

const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-posts', { useMongoClient: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require('./api/routes/routes');
routes(server);

server.listen(3030, () => {
  console.log('server is listening on port 3030');
})
