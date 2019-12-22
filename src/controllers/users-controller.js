const axios = require('axios');

class UserController {
    
    constructor(request = axios){
        this.request = request;
    }
  
   async get(url) {
       let result =  await this.request.get(url);
       
       let headers = result.headers;
       let link = headers.link == null || headers.link == undefined || 
                  headers.link == '' ? '' : headers.link.split(',')[0];

       let retorno = {data: result.data};

       if(link != ''){
         retorno.link = link;
       }
       
       return retorno;
    }
}
     
module.exports = UserController;