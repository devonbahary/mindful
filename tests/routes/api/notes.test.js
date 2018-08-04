const expect = require('expect');
const request = require('supertest');

const { app } = require('../../../server');
const Note = require('../../../models/Note');

const { testUsers, testNotes, populateUsers, populateNotes } = require('../../seed');


beforeEach(done => populateUsers(done));
beforeEach(done => populateNotes(done));

describe('POST /api/notes', () => {
  it('should return 403 for invalid auth', done => {
    const note = {
      noteType: 'note'
    };
    request(app)
      .post('/api/notes')
      .send(note)
      .expect(403, done);
  });

  it('should create a new note with valid auth and valid data', done => {
    const note = { noteType: 'note', topic_id: testUsers[0].topics[0]._id };
    request(app)
      .post('/api/notes')
      .set('authorization', testUsers[0].tokens[0])
      .send(note)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body._id).toBeTruthy();
        expect(res.body.lastUpdated).toBeTruthy();
        expect(res.body.owner_id).toBe(testUsers[0]._id.toString());
        expect(res.body.noteType).toBe(note.noteType);

        Note
          .find()
          .then(notes => {
            expect(notes.length).toBe(testNotes.length + 1);
            done();
          });
      });
  });

  it('should return 400 with valid auth and valid data but unrelated topic_id', done => {
    const note = { noteType: 'note', topic_id: 123 };
    request(app)
      .post('/api/notes')
      .set('authorization', testUsers[0].tokens[0])
      .send(note)
      .expect(400, done);
  });

  it('should return 400 with valid auth but invalid data', done => {
    const note = {};
    request(app)
      .post('/api/notes')
      .set('authorization', testUsers[0].tokens[0])
      .send(note)
      .expect(400, done);
  });
});

describe('GET /api/notes/me', () => {
  it('should return all notes belonging to signed in user', done => {
    request(app)
      .get('/api/notes/me')
      .set('authorization', testUsers[0].tokens[0])
      .expect(200)
      .end((err, res) => {
        expect(res.body.length).toBe(testNotes.filter(note => note.owner_id === testUsers[0]._id).length);
        expect(res.body[0].owner_id).toBe(testUsers[0]._id.toString());
        done();
      });
  });

  it('should return 403 without valid auth', done => {
    request(app)
      .get('/api/notes/me')
      .expect(403, done);
  });
});

describe('GET /api/notes/:id', () => {
  it('should return all notes belonging to a particular user', done => {
    request(app)
      .get(`/api/notes/${testUsers[1]._id}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.length).toBe(testNotes.filter(note => note.owner_id === testUsers[1]._id).length);
        expect(res.body[0].owner_id).toBe(testUsers[1]._id.toString());
        done();
      });
  });

  it('should return 400 for invalid user id', done => {
    request(app)
      .get(`/api/notes/${testUsers[1]._id + 1}`)
      .expect(400, done);
  });
});
