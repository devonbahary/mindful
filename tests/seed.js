const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userOneId = ObjectID();
const userTwoId = ObjectID();
const userThreeId = ObjectID();

const userOneTopicOneId = ObjectID();

const testUsers = [{
  _id: userOneId,
  username: 'Batman',
  password: 'gotham',
  topics: [{
    _id: userOneTopicOneId,
    title: 'Batarangs 101'
  }],
  tokens: [jwt.sign({ _id: userOneId, username: 'Batman' }, process.env.SECRET_KEY)]
}, {
  _id: userTwoId,
  username: 'Superman',
  password: 'metropolis',
  topics: [],
  tokens: [jwt.sign({ _id: userTwoId, username: 'Superman' }, process.env.SECRET_KEY)]
}, {
  _id: userThreeId,
  username: 'Green Lantern',
  password: 'coast city',
  topics: [],
  tokens: [jwt.sign({ _id: userThreeId, username: 'Green Lantern' }, process.env.SECRET_KEY)]
}];

const populateUsers = done => {
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

const testNotes = [{
  _id: ObjectID(),
  noteType: 'note',
  text: 'Batman is the coolest superhero.',
  owner_id: userOneId,
  topic_id: userOneTopicOneId
}];

const populateNotes = done => {
  Note
    .remove({})
    .then(() => {
      const noteOne = new Note(testNotes[0]);

      return Promise.all([noteOne.save()]);
    })
    .then(() => done());
};

module.exports = { testUsers, populateUsers, testNotes, populateNotes };
