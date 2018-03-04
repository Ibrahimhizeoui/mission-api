var express = require('express');
var app = express();
var routes = require('./api/routes/routes.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', routes)
app.listen(3000);