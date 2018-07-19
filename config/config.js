if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-test';
} else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noteable-dev';
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  process.env.SECRET_KEY = 'secretKey';
}
