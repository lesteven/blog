const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
  email: String,
  username: String,
  password: String,
  locked: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
});

User.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
};
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
