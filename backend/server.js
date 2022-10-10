//Configure .env with node dotenv package
require('dotenv').config()

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const mainRoutes = require('./routes/routes');

// express app
const app = express();

//Options for CORS
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// app port
var port = process.env.PORT || 5000;

// connect to db and listen to requests
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to db');
        app.listen(port, () => console.log('listening for requests on port: ', port));
    })
    .catch(err => console.log(err))

// add all routes from routes.js
app.use('/', mainRoutes);