const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userOneId = ObjectID();
const userTwoId = ObjectID();
const userThreeId = ObjectID();

const testUsers = [{
  _id: userOneId,
  username: 'Batman',
  password: 'gotham',
  tokens: [jwt.sign({ _id: userOneId, username: 'Batman' }, process.env.SECRET_KEY)]
}, {
  _id: userTwoId,
  username: 'Superman',
  password: 'metropolis',
  tokens: [jwt.sign({ _id: userTwoId, username: 'Superman' }, process.env.SECRET_KEY)]
}, {
  _id: userThreeId,
  username: 'Green Lantern',
  password: 'coast city',
  tokens: [jwt.sign({ _id: userThreeId, username: 'Green Lantern' }, process.env.SECRET_KEY)]
}];

const populateUsers = (done) => {
  User
    .remove({})
    .then(() => {
      const userOne = new User(testUsers[0]);
      const userTwo = new User(testUsers[1]);
      const userThree = new User(testUsers[2]);

      return Promise.all([userOne.save(), userTwo.save(), userThree.save()]);
    })
    .then(() => done());
};


module.exports = { testUsers, populateUsers };
