# MERN Template

## Features
 * **M**ongoDB
 * **E**xpress
 * **R**eact/Redux
 * **N**ode

### Front-End
* [React-Redux starter template](https://github.com/devonbahary/react-redux-starter-template)
  * Redux DevTools
  * React Router
  * SASS
  * Normalize.css
  * Babel plugins:
    * [Class properties transform](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)
    * [Object rest spread transform](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread/)
  * [Jest](https://jestjs.io/) testing

### Back-End
  * Express
    * Router ('/api')
  * MongoDB (Mongoose)
    * Databases configured for **development** + **testing**
  * [Mocha](https://mochajs.org/) testing

## Get Started
Start the **MongoDB** Server (Windows Command Prompt):

```
cd /Program Files/MongoDB/Server/3.6/bin
mongod.exe --dbpath /Users/Devon/mongo-data
```

## Development
> This template uses **[concurrently](https://www.npmjs.com/package/concurrently)** to run both the client server (port: **8080**) and back-end (port: **5000**) at the same time.

The client-side [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) is configured to proxy requests to **'/api'** to `localhost:5000`:

**/client/webpack.config.js**
```javascript
devServer: {
  // ...,
  proxy: {
    '/api': "http://localhost:5000"
  }
}

```

This way, you can target the api from `localhost:8080/api/...`

Start the development servers:
```
npm run dev
```

**package.json**
```json
"dev": "export NODE_ENV=dev || set \"NODE_ENV=dev\" && concurrently \"npm run server\" \"npm run client\"",
"server": "export NODE_ENV=dev || set \"NODE_ENV=dev\" && nodemon server.js",
"client": "npm run dev-server --prefix client"
```

Now we have `nodemon` for automatic restarts in back-end code and `webpack-dev-server` with live-reload for the front-end.

**/config/config.js**
```javascript
// ...
else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app';
```

Our `process.env.NODE_ENV` has been set to `dev` via our script call, and this allows us to specify a development **MongoDB** database on `localhost:27017` under the name `sample-app`.

Go to `localhost:8080` and batter up!


## Testing
You have a few testing scripts available to you:

**package.json**
```json
"test": "export NODE_ENV=test || set \"NODE_ENV=test\" && mocha tests/**/*.test.js --colors",
"test-watch": "nodemon --exec npm test",
"test-client": "npm test --prefix client",
```

- Run tests on the back-end API with `mocha` using `test` and `test-watch`
- Run tests on the React client with `jest` using `test-client`

By setting our `process.env.NODE_ENV` to `test`, we're able to specify a different testing **MongoDB** database, `sample-app-test`:

**/config/config.js**
```javascript
if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app-test';
}
```

We can seed this testing database and make manipulations to it through testing without affecting data we've been using for development.

## Production

**server.js**
```javascript
// use routes
app.use('/api/samples', samples);

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/public/'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
}
```

Here in production, we've set up **Express** to serve up static assets from `/client/public` that get bundled in:

**package.json**
```json
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run heroku-postbuild --prefix client"
```

Because **Express** middleware functions are executed sequentially, any requests to `/api/samples` will use the routes specified in `/routes/api/samples`.

All other requests will return the `/client/public/index.html` file running our React code.

As for our **MongoDB** database, we have the following specifications for `MONGODB_URI`:
```javascript
if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app-test';
} else if (process.env.NODE_ENV === 'dev') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/sample-app';
}

// ELSE: add your MONGODB_URI here

```

In an else clause, set `process.env.MONGODB_URI` to your own database. I'm aware of a couple options:
* [mLab](https://mlab.com/) database
* Heroku assigns its own `process.env.MONGOB_URI` when [configured for MongoDB](https://devcenter.heroku.com/articles/mean-apps-restful-api#provision-a-mongodb-database).


And that's it! Happy **MERN**ing!
