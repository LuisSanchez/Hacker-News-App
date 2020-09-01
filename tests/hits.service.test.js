const Hit = require('../db/models/hits.model');
const {expect} = require("chai")
const sinon = require("sinon")
const { hitsService } = require('../services/hits.service');

describe('Get hit by id', () => {
    it("Should retrieve hit by an given id" , async () => {
        // Given
        const fixture = {
            _id : "fakehit",
            title: "title",
            url: "url",
        }
        let stub = sinon.stub(Hit , "findById").returns(fixture);

        // When
        let result = await hitsService.getHitById(fixture._id);

        // Assert
        expect(result.title).to.eq("title");
        stub.restore();
    });
});
