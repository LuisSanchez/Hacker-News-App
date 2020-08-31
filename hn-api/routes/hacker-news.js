const axios = require('axios').default;
const Hit = require('../../models/Hit');


async function getHitsFromHackerNews() {
    // GET request for remote hacker rank api
    try {
        return axios({
            method: 'get',
            url: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
            responseType: 'json'
        }).then(response => {

            Hit.create(response.data.hits).then(x => {
                console.log(`hits added to db ${response.data.hits.length}`);
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.getHitsFromHackerNews = getHitsFromHackerNews;
