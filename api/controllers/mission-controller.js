const _ = require('lodash');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { ObjectNotFound } = require('../common/errors');
const ResponseBuilder = require('../common/response-builder');
const { MissionRestApiMapper } = require('../mapper/rest/mission');

const MissionSchema = require('../models/Mession');

const Mission = mongoose.model('Mission', MissionSchema);

require('dotenv').config();


const url = `mongodb://${process.env.dbHost}:${process.env.dbPort}`;
mongoose.connect(url);
module.exports = () => ({
  getMissions: (res) => {
    Mission.find({}, (err, docs) => {
      if (err) throw res.json(err);
      res.json(ResponseBuilder.ok(MissionRestApiMapper.map(docs)));
    });
  },
  getOneMission: (req, res) => {
    const { uuid } = req.params;
    Mission.findOne({ uuid }, (err, docs) => {
      if (err) throw res.json(err);
      if (_.isEmpty(docs)) res.json(new ObjectNotFound('UUID', `Object with ${uuid} not found`));
      res.json(ResponseBuilder.ok(MissionRestApiMapper.map(docs)));
    });
  },
  createMission: (res, req) => {
    const mission = req.body;
    mission.uuid = uuidv4();
    Mission.create(req.body, (err, docs) => {
      if (err) throw res.json(err);
      res.json(ResponseBuilder.created(MissionRestApiMapper.map(docs)));
    });
  },
  updateMission: (req, res) => {
    const { uuid } = req.params;
    Mission.findOne({ uuid }, (err, docs) => {
      if (err) res.json(err);
      if (_.isEmpty(docs)) res.json(new ObjectNotFound('UUID', `Object with ${uuid} not found`));
      Mission.updateOne(req.body, (updateErr, updatedDocs) => {
        if (updateErr) res.json(updateErr);
        res.json(ResponseBuilder.ok(MissionRestApiMapper.map(updatedDocs)));
      });
    });
  },
  deleteMission: (req, res) => {
    const { id } = req.params;
    Mission.Mission.deleteOne({ id }, (err, docs) => {
      if (err) throw res.json(err);
      res.json(ResponseBuilder.deleted(MissionRestApiMapper.map(docs)));
    });
  },
});
