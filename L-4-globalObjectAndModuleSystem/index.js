console.log(__dirname);
console.log(__filename);

const peopleFile = require('./people');
console.log(peopleFile.people);

const _ = require('lodash');
console.log(_.last(peopleFile.people));