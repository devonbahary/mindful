if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-test';
} else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-dev';
} else {
  process.env.MONGODB_URI = 'mongodb://heroku_6c9vnq44:ubcbuod8u5t75clnn0j1ttkcl0@ds141621.mlab.com:41621/heroku_6c9vnq44';
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  process.env.SECRET_KEY = 'secretKey';
}
