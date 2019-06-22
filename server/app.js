const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const MLAB_URI = process.env.MLAB_URI;

mongoose.connect(MLAB_URI, { useNewUrlParser: true }); 
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;