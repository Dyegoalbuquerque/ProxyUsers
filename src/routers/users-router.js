const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');
const urlRoot='https://api.github.com/users';

const handlerHttpResponse = (e, res) => {
     
    console.log(e);

    if(e.response.status == 404){
        return res.status(404).send('username not found');
    }

    return res.status(500).send('error to get data');

};

const usersController = new UserController();
;
 router.get('/',  async (req, res) => { 
     var since = req.query.since;

     try {
        var data = await usersController.get(`${urlRoot}?since=${since}`); 
        return res.status(200).send(data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    }   
});

router.get('/:username/details',  async (req, res) => {  
    try { 
        var username = req.params.username.replace(':', '');     
        var data = await usersController.get(`${urlRoot}/${username}`);  
  
        return res.status(200).send(data);
    } catch (e) {
        return handlerHttpResponse(e, res);
    }  
});

router.get('/:username/repos', async  (req, res) => {   
    try{
        var username = req.params.username.replace(':', ''); 
        var data = await usersController.get(`${urlRoot}/${username}/repos`); 

        return res.status(200).send(data);  
    } catch (e) {      
        return handlerHttpResponse(e, res);
    }    
});
 
module.exports = router;