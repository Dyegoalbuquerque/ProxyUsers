const express = require('express');
const usersRoute = require('./users-router');

const router = express.Router();

router.use('/api/users', usersRoute);
 
module.exports = router;