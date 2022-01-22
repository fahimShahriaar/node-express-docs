const express = require('express');
const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send("Public Dashboard!");
})

module.exports = publicRouter;