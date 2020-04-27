const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Score = require('../model/Score');

router.post('/', [
    check('initials', 'Please enter at least three and no more than five letters').isLength({min: 3, max: 5})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(418).send(errors.array()[0].msg);
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

router.get('/', async (req, res) => {
   let topScores = [];
    try {
       topScores = await Score.find().sort({clicks: 1}).limit(5);

       return res.json({topScores});
   } catch(err) {
       console.error(err.message);
       return res.status(500).send('Server error');
   }
});

module.exports = router;
