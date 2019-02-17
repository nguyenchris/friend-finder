const express = require('express');
const path = require('path');
const router = express.Router();
const friends = require('../data/friends');

router.get('/friends', (req, res) => {
    res.json(friends);
});

router.post('/friends', (req, res) => {
    const answers = req.body;
    console.log(answers)
    friends.push(answers);
    res.send(true);
});

module.exports = router;