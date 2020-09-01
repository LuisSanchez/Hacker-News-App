const Hit = require("../db/models/hits.model");

const service = {
    getAllHits: async function () {
        let hits = await Hit
            .find()
            .sort({
                'created_at': -1
            })
            .limit(5);

        return hits;
    },

    getHitById: async function (id) {
        return await Hit.findById(id);
    },

    removeHitById: async function (id) {
        return await Hit.remove({
            _id: id
        });
    },

    createHits: async function(hits) {
        return await Hit.create(hits).then(x => {
            console.log(`hits added to db ${hits.length}`);
        });
    }
}

module.exports.hitsService = service;
