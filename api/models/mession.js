const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const Mission = new Schema({
  id: ObjectId,
  uuid: {
    type: String,
    required: [true, 'Mission uuid required'],
  },
  title: {
    type: String,
    required: [true, 'Mission title required'],
  },
  description: {
    type: String,
    required: [true, 'Mission description required'],
  },
  status: {
    type: String,
    required: [true, 'Mission status required'],
  },
  user: {
    type: String,
    required: [true, 'User uuid number required'],
  },
},
{
  timestamps: true,
});

module.exports = Mission;
