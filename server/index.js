const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

/**
 * @auth - Alternative for session based authentication
 * 
const passport = require('passport');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const store = new MongoDbStore({
  uri: config.DB_URI,
  collection: 'Sessions',
});
store.on('error', error => console.log(error));
 */

require('./models/meetups');
require('./models/users');
require('./models/threads');
require('./models/posts');
require('./models/categories');

require('./services/passport');

const meetupsRoutes = require('./routes/meetups'),
  usersRoutes = require('./routes/users'),
  threadsRoutes = require('./routes/threads'),
  postsRoutes = require('./routes/posts'),
  categoriesRoutes = require('./routes/categories');

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { pingTimeout: 60000 });

require('./socket/')(io);

app.use(bodyParser.json());

/**
 *  @auth - Alternative for session based authentication
 * 
app.use(
  session({
    secret: config.sessionSecret,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
    store,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
 */

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, function() {
  console.log('App is running on port: ' + PORT);
});
