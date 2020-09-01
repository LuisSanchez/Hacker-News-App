const router = require('express').Router();
const { hitsService } = require('../services/hits.service');

// get all hits
router.get('/', async (req, res) => {
    try {
        console.log('proceeding to get hits...');
        const hits = await hitsService.getAllHits();            
        res.status(200).json(hits);
    } catch (error) {
        res.status(404).json({
            message: error
        });
    }
});

// get a hit by id
router.get('/:id', async (req, res) => {
    try {
        console.log('proceeding to get 1 hit...');
        const hit = await hitsService.getHitById(req.params.id);
        res.json(hit);
    } catch (error) {
        res.status(404).json({
            message: error
        });
    }
});

// delete a hit
router.delete('/:id', async (req, res) => {
    try {
        console.log('proceding to detele a hit...');
        const deletedPost = await hitsService.removeHitById(req.param.id);
        res.json(deletedPost);
    } catch (err) {
        res.status(404).json({
            message: err
        });
    }
});

module.exports = router;
