const express = require('express');
const router = express.Router();
const Hit = require('../models/Hit');

// get all hits
router.get('/', async (req, res) => {
    try {
        console.log('proceding to get hits...');
        const hits = await Hit
            .find()
            .sort({ 'created_at': -1 })
            .limit(5);
        res.json(hits);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// get a hit by id
router.get('/:id', async (req, res) => {
    try {
        console.log('proceding to get 1 hit...');
        const hit = await Hit.findById(req.params.id);
        res.json(hit);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// delete a hit
router.delete('/:id', async (req, res) => {
    try {
        console.log('proceding to detele a hit...');
        const deletedPost = await Post.remove({
            _id: req.params.id
        });
        res.json(deletedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;
