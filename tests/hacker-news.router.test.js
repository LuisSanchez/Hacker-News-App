const assert = require('assert');
const hackerNewsRouter = require('../hacker-news-api/routers/hacker-news.router');

describe('Get news from hacker news api', () => {
    it('Should return ok', () => {
        return hackerNewsRouter.getHitsFromHackerNews().then(result => {
            assert.equal(result.status, 200);
        })
    })
});
