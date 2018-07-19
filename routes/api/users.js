const _ = require('lodash');
const express = require('express');
const User = require('../../models/User');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// @route   GET /api/users
// @desc    get all Users
// @access  public
router.get('/', (req, res) => {
  User.find()
    .sort({ name: 1 }) // ascending order by name
    .then(users => res.json(users.map(user => user.toJSON())));
});

// @route   POST /api/users
// @desc    create new User
// @access  public
router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save()
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('authorization', token);
        res.json(user.toJSON())
      });
    })
    .catch(err => res.sendStatus(400));
});

// @route   POST /api/users/login
// @desc    generate new auth token
// @access  public
router.post('/login', (req, res) => {
  User
    .findByCredentials(req.body.username, req.body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('authorization', token);
        res.send(user.toJSON());
      });
    })
    .catch(err => res.sendStatus(401));
});

// @route   PATCH /api/samples/:id
// @desc    update Sample
// @access  public
// router.patch('/:id', (req, res) => {
//   const updates = _.pick(req.body, ['name']);
//   Sample.findById(req.params.id)
//     .then(sample => {
//       sample.set(updates);
//       sample.save().then(sample => res.json(sample));
//     })
//     .catch(err => res.sendStatus(404));
// });

// @route   DELETE /api/users/logout
// @desc    remove auth token
// @access  private
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.sendStatus(200);
  })
  .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/users/:id
// @desc    remove User
// @access  private
router.delete('/:id', authenticate, (req, res) => {
  User
    .remove({ _id: req.params.id })
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(400));
});

module.exports = router;
