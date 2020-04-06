const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Score = require('../model/Score');

router.post('/', [
    check('initials', 'Please enter at least three and no more than five letters').isLength({min: 3, max: 5})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {clicks, initials} = req.body;

    const score = new Score({clicks, initials});
    try {
        await score.save();
        return res.json({ score });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;
