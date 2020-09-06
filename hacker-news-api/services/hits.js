const Hit = require("../db/models/hits.model");

const service = {
  /**
   * Fetchs the Hits from the database by the given limit
   * @param {Number} limit 5 < limit < 20
   */
  getAllHits: async function (limit) {
    let hits = await Hit.find()
      .sort({
        created_at: -1,
      })
      .limit(limit);

    return hits;
  },

  /**
   * Gets the Hit by the given id
   * @param {Hit._id} id
   */
  getHitById: async function (id) {
    return await Hit.findById(id);
  },

  /**
   * Removes the Hit by the given id
   * @param {Hit._id} id
   */
  removeHitById: async function (id) {
    return await Hit.remove({
      _id: id,
    });
  },

  /**
   * Persist Hit(s) on the database
   * @param {Hits} hits
   */
  createHits: async function (hits) {
    return await Hit.create(hits);
  },
};

module.exports.hitsService = service;
