const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const userSchema = require('../schemas/userSchema');
const User = mongoose.model('User', userSchema);

router.post('/signup', (req, res) => {
    res.send("Hello")
})

module.exports = router;