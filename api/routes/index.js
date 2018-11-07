const express = require('express');
const missionRouter = require('./missions-routes');

const router = express.Router();
router.use('/missions', missionRouter);
module.exports = router;
