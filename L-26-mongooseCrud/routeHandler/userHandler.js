const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();

const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);

// SIGN UP
router.post('/signup', async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: password
        })
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;