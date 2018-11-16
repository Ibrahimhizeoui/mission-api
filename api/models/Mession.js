const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const Mission = new Schema({
  id: ObjectId,
  uuid: String,
  title: String,
  description: String,
  status: String,
},
{
  timestamps: true,
});

module.exports = Mission;
