const app = require('../src/app');
const request = require('supertest');
const chai = require('chai');  
const nock = require('nock');
const DataMock = require('./data-mock');
var expect = chai.expect; 
var urlRoot='https://api.github.com';


describe('Routes: Users - Integration', () => {
    const dataMock = new DataMock();
  
     describe('When requesting list users on pagination', () => {
      const data = dataMock.getUsersPagination();

      beforeEach(async () => { 
        nock(urlRoot)
          .get('/users?since=135')
          .reply(200, { link: 'https://api.github.com/users?since=135', data: data});
      });

      it('Then this endpoint must return a list of GitHub users and the link for the next page', async () => {
    
        var response = await request(app).get('/api/users?since=135');
        
        var objeto = JSON.parse(response.text);
        
        expect(objeto.data.data).to.length.greaterThan(0);
        expect(objeto.data.link).to.not.empty;
      });
     });

     describe('When requesting user details', () => {
      const data = dataMock.getUserDetail();
      
      beforeEach(async () => {
        nock(urlRoot)
          .get('/users/octocat')
          .reply(200, { data: data});
      });

      it('Then this endpoint must return the details of a GitHub user', async () => {

         var response = await request(app).get('/api/users/octocat/details');

         var objeto = JSON.parse(response.text);

         expect(objeto.data.data).to.not.empty;
         expect(objeto.data.data.id).to.greaterThan(0);
         expect(objeto.data.data.login).to.not.empty;
         expect(objeto.data.data.avatar_url).to.not.empty;
         expect(objeto.data.data.created_at).to.not.empty;
       });
     });
   
     describe('When requesting user repositories', () => {
      const data = dataMock.getUsersRepositories();

       beforeEach(async () => {
          nock(urlRoot)
            .get('/users/octocat/repos')
            .reply(200, { data: data});
       });

       it('Then this endpoint must return a list with all user repositories', async () => {

        var response = await request(app).get('/api/users/octocat/repos');

        var objeto = JSON.parse(response.text);      
        
        expect(objeto.data.data).to.length.greaterThan(0);
      });
    });
});