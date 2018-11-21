const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');

const authRouter = require('./auth-routes');
const missionRouter = require('./missions-routes');
const userService = require('../sevice/user')();

const { PermissionDenied, ObjectNotFound } = require('../common/errors');

const url = `mongodb://${process.env.dbHost}:${process.env.dbPort}/${process.env.dbName}`;
mongoose.connect(url);
const verifyUser = async (req, res, next) => {
  const { userUuid } = req.params;
  const user = await userService.getOneByUuid(userUuid);
  if (_.isNull(user)) {
    res.status(404);
    res.send(new ObjectNotFound('UUID', `User not found with uuid: ${req.params.uuid}`));
  }
  if (user.uuid !== req.userUuid) {
    res.status(403);
    res.send(new PermissionDenied(
      'Uuids and token are not matching',
      'Consumer did not have required permission',
    ));
    return;
  }
  next();
};
// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  req.userUuid = userService.verifyToken(req.headers['x-access-token']);
  next();
};


const router = express.Router();
router.use('/users/:userUuid/missions', [verifyToken, verifyUser], missionRouter);
router.use('/auth', authRouter);
module.exports = router;
