const request = require('supertest');
const app = require('../middleware/default');
const mongoose = require("mongoose");
const {expect} = require("chai");
require('dotenv').config({ path: './config/.env' });

describe("Integration test with mongo" , () => {
    before(()=> {
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true})
        mongoose.Promise = global.Promise
    });

    beforeEach(async ()=> {
        mongoose.connection.on('error', err => {
            console.log(err);
        });
    });

    it('Should get last 5 hits', async function () {
        await request(app)
            .get('/api/hits/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(response => {
                expect(Array.isArray(response.body));
                expect(response.body.length).to.equal(20);
            });
    });
});