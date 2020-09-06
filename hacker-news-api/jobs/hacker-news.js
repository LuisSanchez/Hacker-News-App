const hackerNews = require("../routes/hacker-news");
const { hitsService } = require("../services/hits");

const job = {
  /**
   * Fetch data from hacker news every hour and insert it into the db
   */
  populateDBJob: function () {
    try {
      setInterval(async (x, y) => {
        await hackerNews.getHitsFromHackerNews().then((hnres) => {
          hitsService.createHits(hnres.data.hits).then((res) => {
            console.log(`${res.length} hits added to db`);
            return true;
          });
        });
      }, 3600000);
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  /**
   * On first connection, database is null, should be populated
   */
  checkIfIsFirstConnection: async function () {
    const hits = await hitsService.getAllHits();
    if (!hits.length) {
      await hackerNews.getHitsFromHackerNews().then((hnres) => {
        hitsService.createHits(hnres.data.hits).then((dbres) => {
          console.log(
            `First population to the database made with ${hnres.data.hits.length} hits`
          );
          return true;
        });
      });
    } else {
      return false;
    }
  },
};

module.exports.job = job;
