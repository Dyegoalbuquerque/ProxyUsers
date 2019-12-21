const UsersController =  require('../src/controllers/users-controller');
const sinon = require('sinon');
var chai = require('chai');  
var nock = require('nock');
const DataMock = require('./data-mock');
var expect = chai.expect; 
var urlRoot='https://api.github.com/';

  
describe('Controllers: Users - Unit', () => {

   const dataMock = new DataMock();
   const usersController = new UsersController();

   describe('When requesting list users on pagination', () => {
      const url = `${urlRoot}users?since=${135}`;
      const data = dataMock.getUsersPagination();

      beforeEach(async () => {
          nock(urlRoot)
            .get("/users?since=135")
            .reply(200, {link: 'https://api.github.com/users?since=135', data: data});
      });

      it('Then this endpoint must return a list of GitHub users and the link for the next page', async () => {

        var objeto = await usersController.get(url);

        expect(objeto.data.data).to.length.greaterThan(0);
        expect(objeto.data.link).to.not.empty;
      });
    });

   describe('When requesting user details', () => {
      const url = `${urlRoot}users/octocat`;
      const data = dataMock.getUserDetail();

      beforeEach(async () => {
          nock(urlRoot)
            .get("/users/octocat")           
            .reply(200, { data: data});
      });

      it('Then this endpoint must return the details of a GitHub user', async () => {

        var result = await usersController.get(url);
        
        expect(result.data.data).to.not.empty;
        expect(result.data.data.id).to.greaterThan(0);
        expect(result.data.data.login).to.not.empty;
        expect(result.data.data.avatar_url).to.not.empty;
        expect(result.data.data.created_at).to.not.empty;
      });
    });
 
   describe('When requesting user repositories', () => {
     const url = `${urlRoot}users/octocat/repos`;
     const data = dataMock.getUsersRepositories();

     beforeEach(async () => {
          nock(urlRoot)
            .get("/users/octocat/repos")
            .reply(200, { data: data});
      });

     it('Then this endpoint must return a list with all user repositories', async () => {

      var result = await usersController.get(url);
      
      expect(result.data.data).to.length.greaterThan(0);

     });
   });
});