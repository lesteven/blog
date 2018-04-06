const express = require('express');

const authRouter = express.Router();
const passport = require('passport');
const User = require('../models/user');
const sanitize = require('../utils/cleanData');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// register
authRouter.route('/reg')

  .post(sanitize, (req, res, next) => {
    console.log('received data!');
    console.log(req.body);

    if (!req.body.username || !req.body.password) {
      return res.json({ err: 'incomplete form' });
    }
    require('../utils/regStrategy')(passport, res);
    passport.authenticate('register')(req, res, next);
  });

// login
authRouter.route('/log')

  .get((req, res) => {
    if (req.user) {
      res.json({
        user: req.user.username,
      });
    } else {
      res.json({});
    }
  })
  .post(sanitize, (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res.json({ err: 'incomplete form' });
    }
    require('../utils/logStrategy')(passport, res);
    passport.authenticate('login')(req, res, next);
  });

// logout
authRouter.route('/logout')

  .get((req, res) => {
    req.logOut();
    res.clearCookie('connect.sid');
    res.json({ success: 'You have logged out.' });
  });


module.exports = authRouter;
