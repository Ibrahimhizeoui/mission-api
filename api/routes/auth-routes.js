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

setInterval(async (req, res) => {
  const deletedUser = await userController.tokens(req, res);
  // eslint-disable-next-line no-console
  console.log(`>>>>>>>>>> ${new Date().toISOString()} Tokens Deleted: ${deletedUser.n}`);
}, 108000000);

module.exports = authRouter;
