const express = require('express');

const lockedRouter = express.Router();
const Locked = require('../models/locked');
const User = require('../models/user');

lockedRouter.route('/:url')

  .get((req, res) => {
    console.log(req.params);
    Locked.findOneAndRemove(req.params, (err, locked) => {
      if (!locked) {
        res.send("there's nothing here");
      } else {
        User.findOne({ username: locked.username }, (err, user) => {
          user.locked = false;
          user.attempts = 0;

          user.save((err, user) => {
            if (err) return console.error(err);
          });
        });
        res.send('account unlocked');
      }
    });
  });


module.exports = lockedRouter;

