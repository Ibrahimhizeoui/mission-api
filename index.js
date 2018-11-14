const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const bodyParser = require('body-parser');

const routes = require('./api/routes');

const swaggerDocument = YAML.load('./swagger.yml');
app.use(bodyParser.json());
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.port, () => { console.log(`>>>>>>>>>> Server running on port ${process.env.port}`); });
