const mongoose = require('mongoose');

const { Schema } = mongoose;

const Token = new Schema({
  uuid: String,
  token: String,
  expired_at: Date,
});

module.exports = Token;
