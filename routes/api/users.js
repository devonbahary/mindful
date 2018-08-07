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
    .sort({ username: 1 }) // ascending order by username
    .then(users => res.json(users.map(user => user.toJSON())));
});

// @route   GET /api/users/me
// @desc    get your User
// @access  private
router.get('/me', authenticate, (req, res) => {
  res.json(req.user.toJSON());
});

// @route   GET /api/users/:username
// @desc    get all Users
// @access  public
router.get('/:username', (req, res) => {
  User
    .findOne({ username: req.params.username })
    .then(user => {
      if (!user) {
        res.sendStatus(400);
      }
      res.json(user);
    });
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
    .catch(err => { console.log(err); res.sendStatus(400); });
});

// @route   POST /api/users/topics
// @desc    create new Topic for User
// @access  private
router.post('/topics', authenticate, (req, res) => {
  if (req.user.topics.some(topic => topic.title === req.body.title)) {
    res.sendStatus(400);
  } else {
    req.user.topics.push({ title: req.body.title });

    req.user.save()
      .then(user => res.json(user.toJSON()))
      .catch(err => res.sendStatus(400));
  }
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
        res.json(user.toJSON());
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

// @route   PATCH /api/users/topics/:id
// @desc    update User Topic
// @access  private
router.patch('/topics/:id', authenticate, (req, res) => {
  const updates = _.pick(req.body, ['title']);
  const topic = req.user.topics.id(req.params.id);
  if (topic) {
    topic.set(updates);
    req.user.save()
      .then(user => res.json(user.toJSON()))
      .catch(err => res.sendStatus(400));
  } else {
    res.sendStatus(400);
  }
});

// @route   DELETE /api/users/topics/:id
// @desc    remove User Topic
// @access  private
router.delete('/topics/:id', authenticate, (req, res) => {
  req.user.topics.id(req.params.id).remove();
  req.user.save()
    .then(user => res.json(user.toJSON()))
    .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/users/logout
// @desc    remove auth token
// @access  private
router.delete('/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.sendStatus(200);
  })
  .catch(err => res.sendStatus(400));
});

module.exports = router;
