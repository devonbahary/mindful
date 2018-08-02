const _ = require('lodash');
const express = require('express');
const Note = require('../../models/Note');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// @route   POST /api/notes
// @desc    create new Note
// @access  private
router.post('/', authenticate, (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    noteType: req.body.noteType,
    text: req.body.text,
    bullets: req.body.bullets,
    owner_id: req.user._id,
    topic_id: req.body.topic_id
  });

  newNote.save()
    .then(note => {
      res.json(note);
    })
    .catch(err => { res.sendStatus(400);});
});

// @route   GET /api/notes/me
// @desc    get all Notes belonging to signed-in user
// @access  private
router.get('/me', authenticate, (req, res) => {
  Note
    .find({ owner_id: req.user._id })
    .then(notes => res.json(notes));
});

// @route   GET /api/notes/:id
// @desc    get all Notes belonging to User w/id
// @access  public
router.get('/:id', (req, res) => {
  Note
    .find({ owner_id: req.params.id })
    .then(notes => res.json(notes))
    .catch(err => res.sendStatus(400));
});

// @route   PATCH /api/notes/:id
// @desc    update existing Note
// @acesss  private
router.patch('/:id', authenticate, (req, res) => {
  const updates = _.pick(req.body, ['title', 'text', 'noteType', 'bullets']);
  Note.findById(req.params.id)
    .then(note => {
      if (note.owner_id.equals(req.user._id)) {
        note.set(updates);
        note.save().then(note => res.json(note));
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => res.sendStatus(400));
});

// @route   DELETE /api/notes/:id
// @desc    remove Note
// @access  private
router.delete('/:id', authenticate, (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note.owner_id.equals(req.user._id)) {
        note.remove().then(() => res.sendStatus(200))
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => res.sendStatus(404));
});

module.exports = router;
