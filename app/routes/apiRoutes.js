const express = require('express');
const path = require('path');
const router = express.Router();
const data = require('../data/friends');

router.get('/friends', (req, res) => {
    res.json(data);
});

router.post('/friends', (req, res) => {
    const answers = req.body;
});

module.exports = router;