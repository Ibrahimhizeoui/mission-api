const express = require('express');

const authRouter = require('./auth-routes');
const missionRouter = require('./missions-routes');
const userService = require('../sevice/user')();

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  req.userUuid = userService.verifyToken(req.headers['x-access-token']);
  next();
};
const router = express.Router();
router.use('/missions', verifyToken, missionRouter);
router.use('/auth', authRouter);
module.exports = router;
