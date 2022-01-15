const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded());
app.use(express.static(`${__dirname}/../../public/`))
console.log("-------------------");
console.log(__dirname);
console.log("-------------------");

app.get('/', (req, res) => {
    res.send("Hello Programmers!");
})

// data exchange with jsondata
app.post('/jsondata', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

// data exchange with rawdata or buffer data
app.post('/rawdata', (req, res) => {
    console.log(JSON.parse(req.body.toString()));
    res.send(JSON.parse(req.body.toString()));
})

// data exchange with plain text
app.post('/textdata', (req, res) => {
    console.log(req.body);
    console.log(`sending incoming data to you... Type: ${typeof req.body}  data: ${req.body}`);
    res.send(`sending incoming data to you... Type: ${typeof req.body}  data: ${req.body}`)
})

// data exhhange with urlencoded
app.post('/urlencoded', (req, res) => {
    console.log(req.body);
    res.send(`sending incoming data to you... Type: ${typeof req.body}  data: ${req.body}`)
})


// server listening...
app.listen(5000, () => {
    console.log("server running on port: 5000");
})