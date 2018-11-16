const _ = require('lodash');
const { MongoClient } = require('mongodb');
const config = require('../../config.json');
const { ObjectNotFound } = require('../common/errors');
const ResponseBuilder = require('../common/response-builder');
const { MissionRestApiMapper } = require('../mapper/rest/mission');


require('dotenv').config();

let dao;
const url = `mongodb://${process.env.dbHost}:${process.env.dbPort}`;

module.exports = () => ({
  getMissions: (res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').find({}).toArray((collectionErr, result) => {
        if (collectionErr) throw collectionErr;
        // return ResponseBuilder.ok(MissionRestApiMapper.map(result));
        res.json(ResponseBuilder.ok(MissionRestApiMapper.map(result)));
      });
    });
  },
  getOneMission: (req, res) => {
    const { id } = req.params;
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').findOne({ id }, (collectionErr, result) => {
        if (collectionErr) throw collectionErr;
        if (_.isEmpty(result)) throw new ObjectNotFound('Mission by uuid', id);
        res.json(result);
      });
    });
  },
  createMission: (res, req) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').insertOne(req.body, (collectionErr, result) => {
        if (collectionErr) throw collectionErr;
        res.json(result);
      });
    });
  },
  updateMission: (req, res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').updateOne({ title: 'cccopen' }, { $set: req.body }, (collectionErr, result) => {
        if (collectionErr) throw collectionErr;
        res.json(result);
      });
    });
  },
  deleteMission: (req, res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').deleteOne({ title: 'xx' /* id: req.params.id */ }, (collectionErr, result) => {
        if (collectionErr) throw collectionErr;
        res.json(result);
      });
    });
  },

});
