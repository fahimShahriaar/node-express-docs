const express = require('express');

const app = express();
const admin = express();
const teacher = express();

app.use('/admin', admin);
app.use('/teacher', teacher);

app.param('user', (req, res, next, id) => {
    const user = {
        userId: id,
        name: "BD"
    }
    req.userDetail = user;
    next();
})

app.get('/user/:id', (req, res) => {
    const id = req.params;
    console.log(id);
    console.log(req.userDetail);
    res.send(req.userDetail);
})

// teacher route
teacher.get('/dashboard', (req, res) => {
    res.send('teacher dashboard');
})


// admin route
admin.get('/dashboard', (req, res) => {
    res.send('admin dashboard');
})

admin.get('/settings', (req, res) => {
    res.send("admin settings");
})

// app.locals are the local object of the application
app.locals.title = "Name";
app.locals.job = "JOB";
// console.log(app.locals.title);
// console.log(app.locals.job);

const handle = require('./handle');


app.get('/', (req, res) => {
    // app.locals are the local object of the application
    req.app.locals.title = "Name";
    req.app.locals.job = "JOB";
    res.send(`${req.app.locals.title} ${req.app.locals.job}`);
});

app.listen(5000, () => {
    console.log("server running...");

})