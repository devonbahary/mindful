const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Sample = mongoose.model('Sample', SampleSchema);
