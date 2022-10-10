//Configure .env with node dotenv package
require('dotenv').config()

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

// express app
const app = express();

//Settings for CORS
var corsOptions = {
    origin: process.env.FRONTEND_URL,
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

// routes
app.use('/user', userRoutes);
app.use('/', mainRoutes);