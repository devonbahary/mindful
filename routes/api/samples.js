const _ = require('lodash');
const express = require('express');
const Sample = require('../../models/Sample');

const router = express.Router();

// @route   GET /api/samples
// @desc    get all Samples
// @access  public
router.get('/', (req, res) => {
  Sample.find()
    .sort({ name: 1 }) // ascending order by name
    .then(samples => res.json(samples));
});

// @route   POST /api/samples
// @desc    create new Sample
// @access  public
router.post('/', (req, res) => {
  const newSample = new Sample({
    name: req.body.name
  });

  newSample.save()
    .then(sample => res.json(sample))
    .catch(err => res.sendStatus(400));
});

// @route   PATCH /api/samples/:id
// @desc    update Sample
// @access  public
router.patch('/:id', (req, res) => {
  const updates = _.pick(req.body, ['name']);
  Sample.findById(req.params.id)
    .then(sample => {
      sample.set(updates);
      sample.save().then(sample => res.json(sample));
    })
    .catch(err => res.sendStatus(404));
});

// @route   DELETE /api/samples/:id
// @desc    delete Sample
// @access  public
router.delete('/:id', (req, res) => {
  Sample.findById(req.params.id)
    .then(sample => sample.remove().then(() => res.sendStatus(200)))
    .catch(err => res.sendStatus(404));
});

module.exports = router;
