var missionController = require('../controllers/MissionController');
var express = require('express');

exports.getMissions = function (req, res, next) {
    missionController.getMissions(res);
}

exports.getOneMission = function (req, res, next) {
    missionController.getOneMission(res);
}

exports.createMission = function (req, res, next) {
    missionController.createMission(res, req);
}

exports.updateMission = function (req, res, next) {
    missionController.updateMission(req, res);
}

exports.deleteMission = function (req, res, next) {
    missionController.deleteMission(req, res);
}