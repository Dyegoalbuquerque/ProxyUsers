const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users-controller');
const urlRoot='https://api.github.com/users';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOption = {
    swaggerDefinition: {
        info:{
            title: '',
            description: '',
            contact: {
                name: 'sp developer'
            },
            servers:['https://stormy-hollows-04970.herokuapp.com']
        }
    },
    apis: ['users-router.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOption);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const usersController = new UserController();

/** 
 * @swagger
 * /
 * get:
 *  description: use to request users
 *      responses:
 *          '200'
 *              description: a successful response
 * */
 router.get('/',  async (req, res) => { 
     var since = req.query.since;
     var data = await usersController.get(`${urlRoot}?since=${since}`); 
     
     return res.send(data);
 });

 /** 
 * @swagger
 * /:username/details
 * get:
 *  description: use to request users
 *      responses:
 *          '200'
 *              description: a successful response
 * */
router.get('/:username/details',  async (req, res) => {   
    var username = req.params.username.replace(':', '');     
    var data = await usersController.get(`${urlRoot}/${username}`);  
  
    return res.send(data);
});

 /** 
 * @swagger
 * /:username/repos
 * get:
 *  description: use to request users
 *      responses:
 *          '200'
 *              description: a successful response
 * */
router.get('/:username/repos', async  (req, res) => {   
    var username = req.params.username.replace(':', ''); 
    var data = await usersController.get(`${urlRoot}/${username}/repos`); 

    return res.send(data);   
});
 
module.exports = router;