const express = require('express');
const publicRouter = express.Router();

const mw1 = (req, res, next) => {
    console.log("middleware...");
    next();
}

publicRouter.all('*', mw1);

publicRouter.get('/', (req, res) => {
    res.send("Public Dashboard!");
})

module.exports = publicRouter;