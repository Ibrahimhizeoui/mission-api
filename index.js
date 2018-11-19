/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

const routes = require('./api/routes');

const swaggerDocument = YAML.load('./swagger.yml');
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`>>>>>>>>>> ${new Date().toISOString()} Server running on port ${process.env.port}`);
});
