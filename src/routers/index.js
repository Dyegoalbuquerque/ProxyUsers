const express = require('express');
const usersRoute = require('./users-router');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/api/users', usersRoute);
 
module.exports = router;