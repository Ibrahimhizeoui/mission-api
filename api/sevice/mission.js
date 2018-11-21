const mongoose = require('mongoose');
const _ = require('lodash');
const MissionSchema = require('../models/mession');
const { ObjectNotFound, DatabaseSaveOperationError, InvalidJSONSchema } = require('../common/errors');

const Mission = mongoose.model('Mission', MissionSchema);

module.exports = () => {
  const findbyfilter = async (where) => {
    let missions = null;
    try {
      missions = await Mission.find(where);
    } catch (err) {
      return new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return missions;
  };
  const findOneByFilter = (where) => {
    let mission = {};
    try {
      mission = Mission.findOne(where);
    } catch (err) {
      return DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
    }
    return mission;
  };
  return {
    findAll: async (userUuid) => {
      const missions = await findbyfilter({ user: userUuid });
      if (_.isEmpty(missions)) return new ObjectNotFound('UUID', `Object with ${userUuid} not found`);
      return missions;
    },
    findOneByUuid: async (uuid, userUuid) => {
      const mission = await findOneByFilter({ uuid, user: userUuid });
      if (_.isEmpty(mission)) return new ObjectNotFound('UUID', `Object with ${uuid} not found`);
      return mission;
    },
    save: async (mission) => {
      let savedMission = null;
      const MissionTosave = new Mission(mission);
      const ValidationError = MissionTosave.validateSync();
      if (!_.isEmpty(ValidationError)) {
        return new InvalidJSONSchema('Validation error', ValidationError.errors);
      }
      try {
        savedMission = await MissionTosave.save();
      } catch (err) {
        return new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
      }
      return savedMission;
    },
    update: async (mission) => {
      let updatedMission = null;
      try {
        updatedMission = await Mission.updateOne({ mission });
      } catch (err) {
        return new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
      }
      return updatedMission;
    },
    delete: async (id) => {
      let deletedMission = null;
      try {
        deletedMission = await Mission.deleteOne({ id });
      } catch (err) {
        return new DatabaseSaveOperationError(`Cannot save mission due to error: ${err}`);
      }
      return deletedMission;
    },
  };
};
