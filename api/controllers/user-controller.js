const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

const ResponseBuilder = require('../common/response-builder');
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
    if (!bcrypt.compareSync(req.body.password, fetchedUser.password)) {
      res.json(ResponseBuilder.ok({ code: 403, body: 'non' }));
    }
    const token = await userService.saveToken(fetchedUser.uuid);
    res.json(ResponseBuilder.ok({ auth: true, token }));
  },
});
