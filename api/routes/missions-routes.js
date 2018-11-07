const missionController = require('../controllers/mission-controller')();

module.exports = () => ({
  getMissions: (req, res, next) => {
    console.log('gg')
    missionController.getMissions(res);
  },
  getOneMission: (req, res, next) => {
    missionController.getOneMission(res);
  },
  createMission: (req, res, next) => {
    missionController.createMission(res, req);
  },
  updateMission: (req, res, next) => {
    missionController.updateMission(req, res);
  },
  deleteMission: (req, res, next) => {
    missionController.deleteMission(req, res);
  },
});