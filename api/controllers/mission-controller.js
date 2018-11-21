const uuidv4 = require('uuid/v4');

const ResponseBuilder = require('../common/response-builder');
const { MissionRestApiMapper } = require('../mapper/rest/mission');
const missionService = require('../sevice/mission')();
const { ObjectNotFound, DatabaseSaveOperationError, InvalidJSONSchema } = require('../common/errors');

module.exports = () => ({
  getMissions: async (req, res) => {
    const missions = await missionService.findAll(req.userUuid);
    if (missions instanceof ObjectNotFound) {
      res.status(404).send(missions);
    }
    if (missions instanceof DatabaseSaveOperationError) {
      res.status(500).send(missions);
    }
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(missions)));
  },
  getOneMission: async (req, res) => {
    const mission = await missionService.findOneByUuid(req.params.uuid, req.userUuid);
    if (mission instanceof ObjectNotFound) {
      res.status(404).send(mission);
    }
    if (mission instanceof DatabaseSaveOperationError) {
      res.status(500).send(mission);
    }
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(mission)));
  },
  createMission: async (res, req) => {
    const mission = req.body;
    mission.uuid = uuidv4();
    mission.user = req.userUuid;
    const savedMission = await missionService.save(mission);
    if (savedMission instanceof InvalidJSONSchema) {
      res.status(400).send(savedMission);
      return;
    }
    res.json(ResponseBuilder.created(MissionRestApiMapper.map(savedMission)));
  },
  updateMission: async (req, res) => {
    const { uuid } = req.params;
    const mission = await missionService.findOneByuuid(uuid);
    const updatedMission = await missionService.update(mission);
    if (updatedMission instanceof DatabaseSaveOperationError) {
      res.status(500).send(updatedMission);
    }
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(updatedMission)));
  },
  deleteMission: async (req, res) => {
    const { uuid } = req.params;
    const mission = await missionService.findOneByuuid(uuid);
    const deletedMission = await missionService.delete(mission.id);
    if (deletedMission instanceof DatabaseSaveOperationError) {
      res.status(500).send(deletedMission);
    }
    res.json(ResponseBuilder.deleted(MissionRestApiMapper.map(deletedMission)));
  },
});
