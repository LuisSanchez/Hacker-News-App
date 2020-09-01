const hackerNews = require('../routers/hacker-news.router');
const { hitsService } = require('../../services/hits.service');

const job = {
    /**
     * Fetch data from hacker news every hour and insert it into the db
     */
    populateDBJob: function () {
        try {
            setInterval(async (x, y) => {
                await hackerNews.getHitsFromHackerNews()
                    .then(response => {
                        hitsService.createHits(response.data.hits);
                        return true;
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
            hackerNews.getHitsFromHackerNews()
                .then(response => {
                    console.log(`first population to the database made with ${response.data.hits.length} hits`);
                    hitsService.createHits(response.data.hits);
                    return true;
                });
        }
        else {
            return false;
        }        
    }
}

module.exports.job = job;
