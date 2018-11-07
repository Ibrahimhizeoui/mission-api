const express = require('express');
const missionController = require('../controllers/mission-controller')();

const missionsRouter = express.Router();

// Endpoint for misson model
missionsRouter.get('/missions', (req, res) => {
  missionController.getMissions(res);
});
missionsRouter.get('/missions/:id', (req, res) => {
  missionController.getOneMission(res);
});
missionsRouter.post('/missions', (req, res) => {
  missionController.createMission(res, req);
});
missionsRouter.put('/missions/:id', (req, res) => {
  missionController.updateMission(req, res);
});
missionsRouter.delete('/missions/:id', (req, res) => {
  missionController.deleteMission(req, res);
});

module.exports = missionsRouter;
