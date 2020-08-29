// Import Dependences express, bodyParser
const express = require('express');
const bodyParser = require('body-parser');

// Import Routes Users and Info
const users = require('./app/routes/users');
const info = require('./app/routes/info');

// Import BD
const mongoose = require('./app/config/database');

// Import JWT
var jwt = require('jsonwebtoken');
const app = express();

// Define secretKey for JWT
app.set('secretKey', 'A1M9O9=$x39x12z305');

// Define port listen
const PORT_APP = 8082;

// Connect to BD
mongoose.connection.on('error', console.error.bind(console, 'Error de conexion en MongoDB'));

// Define Routes API
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.json({ "message": "Welcome Test React Native" });
});

// Public Routes
app.use('/users', users);

// Private Routes
app.use('/list', validateUser, info);

// validateUser accessToken
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
};

// Define function error 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Errors Define HTTP 500, HTTP 404
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Error in server. Retry again" });
});

// Listen App
app.listen(PORT_APP, function () {
    console.log(`The server is running in: http://localhost:${PORT_APP}`);
});