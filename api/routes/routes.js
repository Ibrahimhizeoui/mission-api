const express = require('express');
const missions = require('./missions-routes')();

const globalRouter = express.Router();

// Endpoint for misson model
globalRouter.get('/missions', missions.getMissions);
globalRouter.get('/missions/:id', missions.getOneMission);
globalRouter.post('/missions', missions.createMission);
globalRouter.put('/missions/:id', missions.updateMission);
globalRouter.delete('/missions/:id', missions.deleteMission);

module.exports = globalRouter;
