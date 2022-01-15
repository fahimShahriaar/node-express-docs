const handle = (req, res) => {
    // app.locals are the local object of the application
    req.app.locals.title = "Name";
    req.app.locals.job = "JOB";

    res.send(`${req.app.locals.title} ${req.app.locals.job}`);
};

module.exports = handle;