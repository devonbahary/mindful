const { ObjectID } = require('mongodb');

const Sample = require('../../models/Sample');

const testSamples = [{
  _id: new ObjectID(),
  name: 'sample1'
}, {
  _id: new ObjectID(),
  name: 'sample2'
}];

const populateSamples = () => {
  return Sample
    .remove({})
    .then(() => {
      const sampleOne = new Sample(testSamples[0]);
      const sampleTwo = new Sample(testSamples[1]);

      Promise.all([sampleOne.save(), sampleTwo.save()]).then(vals => vals);
    });
};

module.exports = { testSamples, populateSamples };
