const express = require('express');
const usersRoute = require('./users-router');
const usersAppRoute = require('./users-app-router');

const router = express.Router();

router.use('/api/users', usersRoute);
 
module.exports = router;