'use strict'

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var config = require('../../config.json');
var dao;

var connection = function() {
    
        var url = 'mongodb://'+config.dbConfig.host+':'+config.dbConfig.port+'/';
        console.log(url);
        MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        dao = db.db(config.dbConfig.dbName);
        });

};

module.exports = connection;

