const express = require('express');
const userController = require('../controllers/user-controller')();

const authRouter = express.Router();

// Endpoint for misson model
authRouter.post('/register', (req, res) => {
  userController.register(req, res);
});
authRouter.post('/login', (req, res) => {
  userController.login(req, res);
});
authRouter.get('/users', (req, res) => {
  userController.getAllUsers(res);
});
authRouter.get('/users/:uuid', (req, res) => {
  userController.getUserByUuid(req, res);
});

setInterval(async (req, res) => {
  const deletedUser = await userController.cleanUpTokens(req, res);
  // eslint-disable-next-line no-console
  console.log(`>>>>>>>>>> ${new Date().toISOString()} Tokens Deleted: ${deletedUser.n}`);
}, 108000000);

module.exports = authRouter;
