import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../../config.js');

// routers
import publicRouter from './publicRoutes/publicRouter';
import adminRouter from './adminRoutes/adminRouter';

// react server side
import { handleRender } from './ssr/ssrFunctions';


// server
const app = express();
app.use(helmet());
app.use(morgan('dev'));
const port = process.env.PORT || 3000;

// for parsing urlencoded && json in req.body
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


// database
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/photography';
const promise = mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('DB connected to server');
});


// passport
const sess = {
  store: new MongoStore({ url }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.secure = true;
  console.log('Production mode');
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());


// get gzip files
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.get('*.svg', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'image/svg+xml');
  next();
});

// serve js files
app.use(express.static('dist'));
app.use(express.static('imgs'));

// client api
app.use('/api', publicRouter);

// admin api
app.use('/admapi', adminRouter);


// use handleRender for each request
app.use(handleRender);


// Check mode
if (app.get('env') === 'development') {
  console.log('Development mode!');
} else {
  console.log('Production mode!');
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

