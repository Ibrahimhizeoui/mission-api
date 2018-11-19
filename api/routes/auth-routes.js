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


module.exports = authRouter;
