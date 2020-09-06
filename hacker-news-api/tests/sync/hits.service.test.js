const Hit = require("../../db/models/hits.model");
const { expect } = require("chai");
const sinon = require("sinon");
const { hitsService } = require("../../services/hits");

describe("Get hit by id", () => {
  it("Should retrieve hit by the given id", async () => {
    // Given
    const fixture = {
      _id: "fakehit",
      title: "title",
      url: "url",
    };
    let stub = sinon.stub(Hit, "findById").returns(fixture);

    // When
    let result = await hitsService.getHitById(fixture._id);

    // Assert
    expect(result.title).to.eq("title");
    stub.restore();
  });
});

describe("Delete hit by id", () => {
  it("Should delete the hit by an given id", async () => {
    // Given
    const fixture = {
      n: "0",
      ok: "1",
      deletedCount: "0",
    };
    let stub = sinon.stub(Hit, "remove").returns(fixture);

    // When
    let result = await hitsService.removeHitById(fixture._id);

    // Assert
    expect(result.ok).to.eq("1");
    stub.restore();
  });
});

describe("Get hits", () => {
  it("Should retrieve 2 hits", async () => {
    // Given
    const fixture = [
      {
        _id: "fakehit1",
        title: "title1",
        url: "url1",
      },
      {
        _id: "fakehit2",
        title: "title2",
        url: "url2",
      },
    ];

    let stub = sinon.stub(Hit, "find").callsFake(() => {
      return {
        sort: sinon.stub().callsFake(() => {
          return {
            limit: sinon.stub().returns(fixture),
          };
        }),
      };
    });

    // When
    let result = await hitsService.getAllHits(fixture);

    // Assert
    expect(result.length).to.eq(2);
    stub.restore();
  });
});

describe("Create hits ", () => {
  it("Should create 2 hits", async () => {
    // Given
    const fixture = [
      {
        _id: "fakehit1",
        title: "title1",
        url: "url1",
      },
      {
        _id: "fakehit2",
        title: "title2",
        url: "url2",
      },
    ];
    let stub = sinon.stub(Hit, "create").returns(fixture);

    // When
    let result = await hitsService.createHits(fixture);

    // Assert
    expect(result.length).to.eq(2);
    stub.restore();
  });
});
