const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(a)
})

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send(err.message)
})

app.listen(5000, () => console.log("Server running on port: 5000"));