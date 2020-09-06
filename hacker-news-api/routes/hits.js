const router = require("express").Router();
const { hitsService } = require("../services/hits");

/**
 * Returns 20 hits by default.
 * By the query string limit a number of hits can be retuned
 * 5 < limit < 200
 */
router.get("/", async (req, res) => {
  try {
    console.log("proceeding to get hits...");
    let limit = isNaN(req.query.limit) ? 20 : Number(req.query.limit);
    // Nevertheless, limit should be max of 200 and greater than 5
    limit = limit > 200 ? 200 : limit;
    limit = limit < 5 ? 5 : limit;
    const hits = await hitsService.getAllHits(limit);
    res.status(200).json(hits);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

// Returns the Hit by the given id
router.get("/:id", async (req, res) => {
  try {
    console.log("proceeding to get 1 hit...");
    const hit = await hitsService.getHitById(req.params.id);
    res.json(hit);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

// Deletes the Hit by the given id
router.delete("/:id", async (req, res) => {
  try {
    console.log("proceding to detele a hit...");
    const deletedPost = await hitsService.removeHitById(req.param.id);
    res.json(deletedPost);
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

module.exports = router;
