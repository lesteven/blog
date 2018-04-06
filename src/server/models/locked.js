const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Locked = new Schema({
  username: String,
  url: String,
});

module.exports = mongoose.model('LockedAccounts', Locked);
