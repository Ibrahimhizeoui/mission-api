var missions = require('./MissionRoutes');
var express = require('express');
var globalRoute = express.Router();

	// Endpoint for misson model
    globalRoute.get('/missions', missions.getMissions);
    globalRoute.get('/missions/:id', missions.getOneMission);
    globalRoute.post('/missions', missions.createMission);
    globalRoute.put('/missions/:id', missions.updateMission);
    globalRoute.delete('/missions/:id', missions.deleteMission);    

module.exports = globalRoute;
