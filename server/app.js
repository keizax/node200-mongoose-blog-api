const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const MLAB_URI = process.env.MLAB_URI;

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${MLAB_URI}`, { useNewUrlParser: true , 
  // auth: {
  //   user: process.env.MONGO_USER,
  //   password: process.env.MONGO_PASSWORD
  },
  (err) => {
  if(err) {
    return console.log(err, 'An internal server error has occured');
  }
}); 
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;