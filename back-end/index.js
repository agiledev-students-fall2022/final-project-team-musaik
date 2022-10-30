require('dotenv').config({ path: 'config.env' });
// database setup
//require('./db');
//const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV == 'production') {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, '../front-end/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
    });
} else {
    // development
    app.get('/', (req, res) => {
        res.send(process.env.NODE_ENV);
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
