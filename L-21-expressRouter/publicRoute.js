const express = require('express');
const publicRouter = express.Router();

const mw1 = (req, res, next) => {
    console.log("middleware...");
    next();
}

publicRouter.all('*', mw1);

publicRouter
    .route('/post')
    .all((req, res, next) => {
        console.log("logging something");
        next();
    })
    .get((req, res) => {
        res.send("All posts will be send");
    })
    .post((req, res) => {
        res.send("Post will posted");
    })
    .delete((req, res) => {
        res.send("Post will be deleted");
    })
    .put((req, res) => {
        res.send("Post will updated");
    })

publicRouter.param('user', (req, res, next, id) => {
    console.log(id);
    req.user = id === "1" ? "Admin" : "Anonymous";

    next();
})

publicRouter.get('/:user', (req, res) => {
    res.send("Public Dashboard!");
})

publicRouter.get('/:user/about', (req, res) => {
    res.send(`Public Information of ${req.user}`);
})

module.exports = publicRouter;