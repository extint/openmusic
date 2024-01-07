const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Db connection
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/opiuM")
    .then(() => {
        console.log('Mongoose connected successfully!');
    })
    .catch((err) => {
        console.log('Failed connection', err);
    })


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'))

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server listening on port 3000");
});

