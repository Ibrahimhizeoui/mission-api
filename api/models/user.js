const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const User = new Schema({
  id: ObjectId,
  uuid: String,
  name: String,
  email: String,
  status: String,
  password: String,
},
{
  timestamps: true,
});

module.exports = User;
