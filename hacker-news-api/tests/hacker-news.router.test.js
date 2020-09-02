const assert = require('assert');
const hackerNewsRouter = require('../routes/hacker-news');

describe('Get news from hacker news api', () => {
    it('Should return ok', () => {
        return hackerNewsRouter.getHitsFromHackerNews().then(result => {
            assert.equal(result.status, 200);
        })
    })
});
