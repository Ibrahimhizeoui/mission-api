const mongoose = require('mongoose');
const _ = require('lodash');
const MissionSchema = require('../models/mession');
const { ObjectNotFound, DatabaseSaveOperationError } = require('../common/errors');

const Mission = mongoose.model('Mission', MissionSchema);

const url = `mongodb://${process.env.dbHost}:${process.env.dbPort}`;
mongoose.connect(url);

module.exports = () => ({
  findAll: async () => {
    let missions = null;
    try {
      missions = await Mission.find({});
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return missions;
  },
  findOneByUuid: async (uuid) => {
    let mission = null;
    try {
      mission = Mission.findOne({ uuid });
      if (_.isEmpty(mission)) throw new ObjectNotFound('UUID', `Object with ${uuid} not found`);
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
  },
  save: async (mission) => {
    let savedMission = null;
    try {
      savedMission = await Mission.create({ mission });
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return savedMission;
  },
  update: async (mission) => {
    let updatedMission = null;
    try {
      updatedMission = await Mission.updateOne({ mission });
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return updatedMission;
  },
  delete: async (id) => {
    let deletedMission = null;
    try {
      deletedMission = await Mission.deleteOne({ id });
    } catch (err) {
      throw new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return deletedMission;
  },
});
