const User = require('../../models/User');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  User
    .findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => res.sendStatus(403));
};

module.exports = authenticate;
