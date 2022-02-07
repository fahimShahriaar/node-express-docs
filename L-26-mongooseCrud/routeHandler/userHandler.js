const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const { route } = require("./todoHandler");
const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Signup was successful!",
        });
    } catch {
        res.status(500).json({
            message: "Signup failed!",
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                // generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, "process.env.JWT_SECRET", {
                    expiresIn: '10h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "wrong pass. Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "User Not found! Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});

router.get('/', async (req, res) => {
    const users = await User.find({}, { __v: 0 })
        .populate("todos", "title description date -_id");
    res.send(users);
})

module.exports = router;
