const uuidv4 = require('uuid/v4');

const ResponseBuilder = require('../common/response-builder');
const { MissionRestApiMapper } = require('../mapper/rest/mission');
const missionService = require('../sevice/mission')();

module.exports = () => ({
  getMissions: async (res) => {
    const missions = await missionService.findAll();
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(missions)));
  },
  getOneMission: async (req, res) => {
    const { uuid } = req.params;
    const mission = await missionService.findOneByuuid(uuid);
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(mission)));
  },
  createMission: async (res, req) => {
    const mission = req.body;
    mission.uuid = uuidv4();
    const savedMission = await missionService.save();
    res.json(ResponseBuilder.created(MissionRestApiMapper.map(savedMission)));
  },
  updateMission: async (req, res) => {
    const { uuid } = req.params;
    const mission = await missionService.findOneByuuid(uuid);
    const updatedMission = await missionService.update(mission);
    res.json(ResponseBuilder.ok(MissionRestApiMapper.map(updatedMission)));
  },
  deleteMission: async (req, res) => {
    const { uuid } = req.params;
    const mission = await missionService.findOneByuuid(uuid);
    const deletedMission = await missionService.delete(mission.id);
    res.json(ResponseBuilder.deleted(MissionRestApiMapper.map(deletedMission)));
  },
});
