const { assert } = require("chai");
const { job } = require("../../jobs/hacker-news");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

describe("Check if its first connection", () => {
  before(() => {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.Promise = global.Promise;
  });

  beforeEach(async () => {
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  });

  it("Should return false if the db is populated", async () => {
    const result = await job.checkIfIsFirstConnection();
    assert.isNotOk(result);
  });
});
