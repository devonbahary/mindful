const mongoose = require('mongoose');
const User = require('./User');

const NoteSchema = new mongoose.Schema({
  title: {
    type: 'String'
  },
  noteType: {
    type: 'String',
    required: true,
    validate: {
      validator: function (value) {
        return (value === 'note' || value === 'list') ? Promise.resolve() : Promise.reject();
      }
    }
  },
  text: {
    type: 'String'
  },
  bullets: [{
    type: String
  }],
  owner_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    validate: {
      validator: function (value) {
        return User.findById(value).then(user => {
          return user ? Promise.resolve() : Promise.reject();
        });
      }
    },
  },
  topic_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    validate: {
      validator: function (value) {
        return User.findById(this.owner_id).then(user => {
          return user.topics.some(topic => topic._id.toString() == value) ? Promise.resolve() : Promise.reject();
        });
      }
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  },
});

NoteSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = Note = mongoose.model('Note', NoteSchema);
