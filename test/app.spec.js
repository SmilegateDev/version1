const should = require('should');
const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Testing /test', ()=>{
    it('GET mongo_test should return 200 status code', (done) =>{
        request(app)
            .get('/test/mongo_test')
            .expect(200)
            .end( (err, res)=> {
                if(err) throw err;
                done();
            });
    });

    it('POST join_test should return 200 status code', (done) => {
        request(app)
             .post('/test/join_test')
             .send({
                 nickname : "test12",
                 uid : "tes12t@test12.com",
                 password : "dsfdsdsfdsfsd",
             })
             .expect(200)
             .end ( (err, res) => {
                 if(err) throw err;
                 done();
             });
             
     }).timeout(10000);

});