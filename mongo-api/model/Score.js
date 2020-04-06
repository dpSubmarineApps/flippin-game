const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    clicks: {
        type: Number,
        required: true
    },
    initials: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = Score = mongoose.model('score', ScoreSchema);