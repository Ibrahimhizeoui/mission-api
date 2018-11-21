const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const date = require('date-and-time');
const _ = require('lodash');
const { ObjectNotFound, DatabaseSaveOperationError, AuthenticationFailed } = require('../common/errors');
const userSchema = require('../models/user');
const tokenSchema = require('../models/token');

const User = mongoose.model('User', userSchema);
const Token = mongoose.model('Token', tokenSchema);


module.exports = () => {
  const findbyfilter = async (where) => {
    let users = null;
    try {
      users = await User.find(where);
    } catch (err) {
      return new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return users;
  };
  const findOneByFilter = (where) => {
    let user = {};
    try {
      user = User.findOne(where);
    } catch (err) {
      return DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return user;
  };
  return {
    saveUser: async (user) => {
      let savedUser = null;
      try {
        savedUser = await User.create(user);
      } catch (err) {
        throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
      }
      return savedUser;
    },
    getOneByUuid: async (uuid) => {
      const fetchedUser = await findOneByFilter({ uuid });
      if (_.isPlainObject(fetchedUser)) return new ObjectNotFound('UUID', `Object with ${uuid} not found`);
      return fetchedUser;
    },
    getAll: async () => {
      const users = await findbyfilter({});
      if (_.isPlainObject(users)) return new ObjectNotFound('UUID', 'Object not found');
      return users;
    },
    saveToken: async (uuid) => {
      let savedToken = null;
      try {
        const token = jwt.sign({ uuid }, process.env.secret, {
          expiresIn: 60 * 60 * 5,
        });
        savedToken = await Token.create(
          { uuid, token, expired_at: date.addMinutes(new Date(), +65) },
        );
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
        throw new AuthenticationFailed(`Failed to authenticate token due to error: ${err}`);
      }
      return decoded.uuid;
    },
    getOneByEmail: async (email) => {
      const fetchedUser = await findOneByFilter({ email });
      if (_.isNull(fetchedUser)) return new ObjectNotFound('UUID', `Object with ${email} not found`);
      return fetchedUser;
    },
    deleteExpiredToken: async () => {
      let tokens = null;
      try {
        tokens = Token.deleteMany({ expired_at: { $lte: new Date() } });
      } catch (err) {
        throw new DatabaseSaveOperationError(`Cannot save token due to error: ${err}`);
      }
      return tokens;
    },
  };
};
