const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose")
const password = encodeURIComponent("semicolonizer");
const dbURI = `mongodb+srv://opium:${password}@nodet.qugbjpj.mongodb.net/nodet?retryWrites=true&w=majority`;
const cors = require('cors');
const fs = require('fs');
const path = './.env';
const { refreshToken } = require('./utils/spotifyapi');
require("dotenv").config({ override: true });
// const { getTracks } = require("./utils/spotifyapi");

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

mongoose.connect(dbURI, { useNewUrlParser: true })
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
app.use(cookieparser());
app.use(require('./routes'))

app.listen(8000, (err) => {
    if (err) {
        console.log(err);
    }
    if (fs.existsSync(path)) {
        console.log('env exists');
    } else {
        console.error('env file not found, please set up your .env file correctly');
    }
    setInterval(() => {
        refreshToken();
    }, 3500000);
    refreshToken();
    console.log("Server listening on port 8000");
});

