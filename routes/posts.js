const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const {
    updateOne
} = require('../models/Post');

// get all posts
router.get('/', async (req, res) => {
    try {
        console.log('proceding to get posts...');
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// get a post by id
router.get('/:id', async (req, res) => {
    try {
        console.log('proceding to get 1 post...');
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

router.get('/specific', (req, res) => {
    res.send('We are on specific posts');
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        console.log('proceding to save posts...');
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json(`error ${err}`);
    }

    // sync method
    // post.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({
    //             message: err
    //         });
    //     });
});

router.delete('/:id', async (req, res) => {
    try {
        console.log('proceding to detele a post...');
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

router.patch('/:id', async (req, res) => {
    try {
        console.log('proceding to update a post...');
        const updatedPost = await Post.updateOne({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;