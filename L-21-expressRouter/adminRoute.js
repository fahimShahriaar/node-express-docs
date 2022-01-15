const express = require('express');
const adminRoute = express.Router();

adminRoute.get('/', (req, res) => {
    res.send("Admin root route")
})

adminRoute.get('/setting', (req, res) => {
    res.send("Admin setting")
})

module.exports = adminRoute;