const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all Users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    });
});

// Get single User
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('ERROR: User not found')
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    });
});

// Create a User
router.post('/', (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  user.save(function (err, user) {
    if (user) {
    res.status(201).send(user);
    } else console.log(err);
  });
  console.log(user);
});

// Update a User
router.put("/:id", (req, res) => {
  const id = req.params.id;
    User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
      .then(users => {
      res.status(204).json(users);
    });
});

// Delete a User
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json(user);
    });
})

module.exports = router;