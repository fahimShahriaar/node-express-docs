const fs = require('fs');

// fs.writeFileSync('myText.txt', 'Hello');
// fs.appendFileSync('myText.txt', ' Programmers!');

const myText = fs.readFileSync('myText.txt');
// console.log(myText.toString());


fs.readFile('myText.txt', (err, data) => {
    console.log(data.toString());
})

console.log("Hi");