const express = require('express');
const app = express();

const adminRoute = require('./adminRoute');
const publicRouter = require('./publicRoute');

app.use('/admin', adminRoute);
app.use('/', publicRouter);

app.listen(5000, () => console.log("server running on port: 5000"));