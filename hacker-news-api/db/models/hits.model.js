const mongoose = require('mongoose');

const HitSchema = mongoose.Schema({
    created_at: Date,
    title: String,
    url: String,
    author: String,
    points: String,
    story_text: String,
    comment_text: String,
    num_comments: String,
    story_id: Number,
    story_title: String,
    story_url: String,
    parent_id: Number,
    created_at_i: Number,
    _tags: [String],
    objectID: Number,
    _highlightResult: {
        author: {
            value: String,
            matchLevel: String,
            fullyHighlighted: Boolean,
            matchedWords: [String]
        },
        comment_text: {
            value: String,
            matchLevel: String,
            matchedWords: []
        },
        story_title: {
            value: String,
            matchLevel: String,
            matchedWords: []
        },
        story_url: {
            value: String,
            matchLevel: String,
            matchedWords: []
        }
    }
});

module.exports = mongoose.model("Hits", HitSchema);
