const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("Hello Programmers");
        res.end();
    } else if (req.url === '/about') {
        res.write("Node.js developer here...");
        res.end();
    }
}).listen(5000);