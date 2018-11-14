const express = require('express');
const missionController = require('../controllers/mission-controller')();

const missionsRouter = express.Router();

// Endpoint for misson model
missionsRouter.get('/', (req, res) => {
  missionController.getMissions(res);
});
missionsRouter.get('/:id', (req, res) => {
  missionController.getOneMission(req, res);
});
missionsRouter.post('', (req, res) => {
  missionController.createMission(res, req);
});
missionsRouter.put('/:id', (req, res) => {
  missionController.updateMission(req, res);
});
missionsRouter.delete('/:id', (req, res) => {
  missionController.deleteMission(req, res);
});

module.exports = missionsRouter;
