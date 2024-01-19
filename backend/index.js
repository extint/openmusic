const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// Db connection
const mongoose = require("mongoose")
const password = encodeURIComponent("semicolonizer");
const dbURI = `mongodb+srv://opium:${password}@nodet.qugbjpj.mongodb.net/nodet?retryWrites=true&w=majority`;

mongoose.connect(dbURI,{useNewUrlParser:true,usefieldTopology:true,useCreateIndex:true})
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

app.listen(8000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server listening on port 3000");
});

