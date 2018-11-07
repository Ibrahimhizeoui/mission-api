const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes.js');

app.use(bodyParser.json());
app.use('/api/v1', routes);
app.listen(3000);
