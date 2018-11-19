const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const date = require('date-and-time');
const { ObjectNotFound, DatabaseSaveOperationError, AuthenticationFailed } = require('../common/errors');
const userSchema = require('../models/user');
const tokenSchema = require('../models/token');

const User = mongoose.model('User', userSchema);
const Token = mongoose.model('Token', tokenSchema);
const url = `mongodb://${process.env.dbHost}:${process.env.dbPort}/${process.env.dbName}`;
mongoose.connect(url);

module.exports = () => ({
  saveUser: async (user) => {
    let savedUser = null;
    try {
      savedUser = await User.create(user);
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return savedUser;
  },
  saveToken: async (uuid) => {
    let savedToken = null;
    try {
      const token = jwt.sign({ uuid }, process.env.secret, {
        expiresIn: '1h',
      });
      savedToken = await Token.create({ uuid, token, expired_at: date.addHours(new Date(), +2) });
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save token due to error: ${err}`);
    }
    return savedToken.token;
  },
  verifyToken: (token) => {
    if (!token) {
      throw new AuthenticationFailed('No token provided');
    }
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.secret);
    } catch (err) {
      throw new AuthenticationFailed('Failed to authenticate token.');
    }
    return decoded.uuid;
  },
  getOneByEmail: async (email) => {
    let user = null;
    try {
      user = User.findOne({ email });
    } catch (e) {
      throw new ObjectNotFound('User', 'error login');
    }
    return user;
  },
});
