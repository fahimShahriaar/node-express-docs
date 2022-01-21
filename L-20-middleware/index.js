const express = require('express');
const app = express();

const adminRouter = express.Router();

// Custom Middleware
const mw1 = (req, res, next) => {
    req.user = "Fahim Shahriar";
    console.log("From mw1", req.user);
    // res.end();
    next();
}

const mw2 = (req, res, next) => {
    console.log(`From mw2 ${new Date(Date.now()).toLocaleString()} - ${req.method} ${req.protocol} ${req.ip}`);
    req.user = "From Fahim to Iffat Aman"
    next();
}

const mw3 = (req, res, next) => {
    console.log("From mw3, ERROR THROWING");
    throw new Error("This is an ERROR")
}

// Error handling middleware
const errorHandling_mw4 = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(`${err}`)
}

// ### USING middleware ###
// ---Application Middleware---
app.use(mw1);
app.use('/admin', adminRouter);

// Router Middleware
adminRouter.use(mw2);
adminRouter.use(mw3);
adminRouter.use(errorHandling_mw4);


app.get('/', (req, res) => {
    console.log("From Public API", req.user);
    res.send("Hello Friday!");
})

// admin routes api
adminRouter.get('/dashboard', (req, res) => {
    console.log("From Admin API");
    res.send("Welcome to Admin Dashboard!")
})

app.listen(5000, () => console.log("Listening on port: 5000"));