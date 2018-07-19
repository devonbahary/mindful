const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userOneId = ObjectID();
const userTwoId = ObjectID();

const users = [{
  _id: userOneId,
  username: 'Batman',
  password: 'batcave',
  tokens: [jwt.sign({ _id: userOneId, username: 'Batman' }, process.env.SECRET_KEY)]
}, {
  _id: userTwoId,
  username: 'Superman',
  password: 'metropolis',
  tokens: [jwt.sign({ _id: userTwoId, username: 'Superman' }, process.env.SECRET_KEY)]
}];

const populateUsers = (done) => {
  User
    .remove({})
    .then(() => {
      const userOne = new User(users[0]);
      const userTwo = new User(users[1]);

      return Promise.all([userOne.save(), userTwo.save()]);
    })
    .then(() => done());
};


module.exports = { users, populateUsers };
