const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 24,
    unique: true,
    match: /^[a-zA-Z0-9-_.+!*'() ]+$/
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 12
  },
  password: {
    type: String,
    required: true
  },
  topics: [TopicSchema],
  tokens: [{
    type: String
  }]
});

UserSchema.statics.findByToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return User.findOne({
      _id: decoded._id,
      'tokens': token
    });
  } catch(err) {
    return Promise.reject();
  }
};

UserSchema.statics.findByCredentials = function(username, password) {
  const User = this;

  return User
    .findOne({ username })
    .then(user => {
      if (!user) return Promise.reject();

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    })
};

UserSchema.path('topics').validate(function(value) {
  let seen = {};
  return !this.topics.some(topic => {
    if (seen[topic.title]) {
      return true;
    } else {
      seen[topic.title] = true;
    }
  });
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign(_.pick(user, ['_id', 'username']), process.env.SECRET_KEY);
  user.tokens = user.tokens.concat([token]);
  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function (token) {
  const user = this;

  user.tokens = user.tokens.filter(userToken => userToken !== token);
  return user.save();
};

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user, ['username', '_id', 'topics']);
};

module.exports = User = mongoose.model('User', UserSchema);
