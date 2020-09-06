const axios = require("axios").default;

/**
 * GET request for remote hacker rank api
 */
async function getHitsFromHackerNews() {
  try {
    return axios({
      method: "get",
      url: "https://hn.algolia.com/api/v1/search_by_date?query=nodejs",
      responseType: "json",
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.getHitsFromHackerNews = getHitsFromHackerNews;
