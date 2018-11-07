const { MongoClient } = require('mongodb');
const config = require('../../config.json');
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
        res.json(result);
      });
    });
  },
  getOneMission: (res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dao = db.db(config.dbConfig.dbName);
      dao.collection('missions').findOne({}, (collectionErr, result) => {
        if (collectionErr) throw collectionErr;
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
