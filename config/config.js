if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-test';
} else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-dev';
} else {
  process.env.MONGODB_URI = 'mongodb://heroku_bngp1j90:6814j89ql371ov16fta9id2vcp@ds115022.mlab.com:15022/heroku_bngp1j90';
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  process.env.SECRET_KEY = 'secretKey';
}
