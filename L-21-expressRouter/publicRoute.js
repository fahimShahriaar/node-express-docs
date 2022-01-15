const express = require('express');

const publicRouter = express.Router();

// middleware
const logging = (req, res, next) => {
    console.log("Logging middleware");
    next();
}

publicRouter.all('*', logging);

publicRouter.get('/', (req, res) => {
    console.log("Hello From Public route");
    res.send("Hello From Public route")
})

publicRouter.get('/post', (req, res) => {
    res.send("Post here from public route")
})

module.exports = publicRouter;