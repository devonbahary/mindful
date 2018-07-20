const expect = require('expect');
const request = require('supertest');

const { app } = require('../../../server');
const User = require('../../../models/User');

const { testUsers, populateUsers } = require('../../seed');


beforeEach(done => populateUsers(done));

describe('GET /api/users', () => {
  it('should return users in alphabetical order', done => {
    request(app)
      .get('/api/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length).toBe(testUsers.length);

        const sortedUsernames = testUsers.map(user => user.username).sort();

        expect(res.body[0].username).toBe(sortedUsernames[0]); // 'Batman' first
        expect(res.body[1].username).toBe(sortedUsernames[1]); // 'Green Lantern' second
        expect(res.body[2].username).toBe(sortedUsernames[2]); // 'Superman' last
        done();
      });
  });
});

describe('POST /api/users', () => {
  it('should create a new User', done => {
    const username = 'Lex Luthor';
    const password = 'kryptonite';

    request(app)
      .post('/api/users')
      .send({
        username,
        password
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.username).toBe(username);
        expect(res.body.password).not.toBe(password); // hashed
        expect(res.body._id).toBeTruthy();
        expect(res.headers['authorization']).toBeTruthy();

        User
          .find()
          .then(users => {
            expect(users.length).toBe(testUsers.length + 1);
            done();
          });
      });
  });

  it('should not create a new User with invalid username/password', done => {
    const username = 'Lex Luthor';

    request(app)
      .post('/api/users')
      .send({ username })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        User
          .find()
          .then(users => {
            expect(users.length).toBe(testUsers.length);
            done();
          });
      });
  });

  it('should not create a new User for existing username', done => {
    const password = 'validpwd';

    request(app)
      .post('/api/users')
      .send({
        username: testUsers[0].username,
        password
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        User
          .find()
          .then(users => {
            expect(users.length).toBe(testUsers.length);
            done();
          });
      });
  });
});

describe('POST /api/users/login', () => {
  it('should return user and auth token for valid credentials', done => {
    request(app)
      .post('/api/users/login')
      .send({
        username: testUsers[0].username,
        password: testUsers[0].password
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.headers['authorization']).toBeTruthy();
        expect(res.body.username).toBe(testUsers[0].username);
        expect(res.body._id).toBeTruthy();
        User
          .findById(testUsers[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(testUsers[0].tokens.length + 1);
            done();
          })
          .catch(err => done(err));
      })
  });

  it('should return 401 for invalid credentials', done => {
    request(app)
      .post('/api/users/login')
      .send({
        username: testUsers[1].username,
        password: 'nottherightpasswordjack'
      })
      .expect(401, done);
  });
});

describe('DELETE /api/users/:id', () => {
  it('should delete User w/valid auth token', done => {
    request(app)
      .delete(`/api/users/${testUsers[1]._id}`)
      .set('authorization', testUsers[1].tokens[0])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        User
          .find()
          .then(users => {
            expect(users.length).toBe(testUsers.length - 1);
            done();
          })
      });
  });

  it('should return 403 for request to delete User w/invalid auth token', done => {
    request(app)
      .delete(`/api/users/${testUsers[1]._id}`)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);

        User.find().then(users => {
          expect(users.length).toBe(testUsers.length);
          done();
        });
      });
  });
});

describe('DELETE /api/users/logout', () => {
  it('should delete auth token for logged in user', done => {
    request(app)
      .delete('/api/users/logout')
      .set('authorization', testUsers[0].tokens[0])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        User.findById(testUsers[0]).then(user => {
          if (!user) return done(err);

          expect(user.tokens.length).toBe(0);
          done();
        });
      })
  });
});
