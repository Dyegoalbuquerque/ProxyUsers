const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app