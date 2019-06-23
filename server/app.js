const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
// const MLAB_URI = process.env.MLAB_URI;

mongoose.connect(`mongodb://test:test12@ds341837.mlab.com:41837/heroku_mcn2pcwq`, { useNewUrlParser: true },
  (err) => {
  if(err) {
    return console.log(err, 'An internal server error has occured');
  }
}); 
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('HELLO WORLD');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;