const express = require('express');
const missionController = require('../controllers/mission-controller')();

const missionsRouter = express.Router();

// Endpoint for misson model
missionsRouter.get('', (req, res) => {
  missionController.getMissions(req, res);
});
missionsRouter.get('/:uuid', (req, res) => {
  missionController.getOneMission(req, res);
});
missionsRouter.post('', (req, res) => {
  missionController.createMission(res, req);
});
missionsRouter.put('/:uuid', (req, res) => {
  missionController.updateMission(req, res);
});
missionsRouter.delete('/:uuid', (req, res) => {
  missionController.deleteMission(req, res);
});

module.exports = missionsRouter;
