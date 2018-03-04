var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//var dbConnector = require('../dao/dbConnector');
var mongo = require('mongodb');
var config = require('../../config.json');

var dao;
var url = 'mongodb://'+config.dbConfig.host+':'+config.dbConfig.port+'/';
        
exports.getMissions = function(res) {
		MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        dao.collection("missions").find({}).toArray(function(err, result) {

        if (err) throw err;
        	res.json(result)
        });
    });
}

exports.getOneMission = function(res) {
		MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        dao.collection("missions").findOne({},function(err, result) {

        if (err) throw err;
        res.json(result)
        });
    });
}

exports.createMission = function(res, req) {
		MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        dao.collection("missions").insertOne(req.body, function(err, result) {
        if (err) throw err;
        res.json(result);
        });
    });
}

exports.updateMission = function(req, res) {
		MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        dao.collection("missions").updateOne({ title: 'cccopen' }, {$set:req.body}, function(err, result) {
        if (err) throw err;
        res.json(result);
        });
    });
}

exports.deleteMission = function(req, res) {
		MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        dao.collection("missions").deleteOne({title: 'xx' /*id: req.params.id*/ }, function(err, result) {
        if (err) throw err;
        res.json(result);
        });
    });
}
