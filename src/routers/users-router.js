const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');
const urlRoot='https://api.github.com/users';

const usersController = new UserController();

 router.get('/',  async (req, res) => { 
     var since = req.query.since;
     var data = await usersController.get(`${urlRoot}?since=${since}`); 
     
     return res.send(data);
 });

router.get('/:username/details',  async (req, res) => {   
    var username = req.params.username.replace(':', '');     
    var data = await usersController.get(`${urlRoot}/${username}`);  
  
    return res.send(data);
});

router.get('/:username/repos', async  (req, res) => {   
    var username = req.params.username.replace(':', ''); 
    var data = await usersController.get(`${urlRoot}/${username}/repos`); 

    return res.send(data);   
});
 
module.exports = router;