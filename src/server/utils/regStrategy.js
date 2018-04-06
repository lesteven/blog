const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, res) {
  passport.use('register', new LocalStrategy(
    {
      passReqToCallback: true,
    },

    ((req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return res.json({ err: 'there was an error' });
        }
        if (!user) {
          console.log(req.body);
          const newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);
          newUser.email = req.body.email;

          newUser.save((err) => {
            if (err) {
              return res.json({ err: 'there was an error' });
            }
            return res.json({ success: 'You are now registered.' });
          });
        }
        if (user) {
          return res.json({ err: 'user already exist' });
        }
      });
    }),

  ));
};

