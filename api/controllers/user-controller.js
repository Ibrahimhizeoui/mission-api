const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { ObjectNotFound } = require('../common/errors');

const ResponseBuilder = require('../common/response-builder');
const { UserRestApiMapper } = require('../mapper/rest/user');
const userService = require('../sevice/user')();

module.exports = () => ({
  register: async (req, res) => {
    const user = req.body;
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.uuid = uuidv4();
    user.password = hashedPassword;
    const saverduser = await userService.saveUser(user);
    const token = await userService.saveToken(saverduser.uuid);
    res.json(ResponseBuilder.created({ auth: true, token }));
  },

  login: async (req, res) => {
    const user = req.body;
    const fetchedUser = await userService.getOneByEmail(user.email);
    console.log(fetchedUser);
    if (fetchedUser instanceof ObjectNotFound) {
      res.status(404).send(fetchedUser);
    }
    if (!bcrypt.compareSync(req.body.password, fetchedUser.password)) {
      res.json(ResponseBuilder.ok({ code: 403, body: 'non' }));
    }
    const token = await userService.saveToken(fetchedUser.uuid);
    res.json(ResponseBuilder.ok({ auth: true, token }));
  },
  cleanUpTokens: async () => {
    const deleted = await userService.deleteExpiredToken();
    return deleted;
  },
  getUserByUuid: async (req, res) => {
    const user = await userService.getOneByUuid(req.params.uuid);
    if (_.isNull(user)) {
      res.status(404);
      res.send(new ObjectNotFound('UUID', `User not found with uuid: ${req.params.uuid}`));
    }
    res.json(ResponseBuilder.ok(UserRestApiMapper.map(user)));
  },
  getAllUsers: async (res) => {
    const users = await userService.getAll();
    res.json(ResponseBuilder.ok(UserRestApiMapper.map(users)));
  },
});
