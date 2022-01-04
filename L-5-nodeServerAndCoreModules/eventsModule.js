const School = require('./eventsModule2');
const school = new School();

// register an event
school.on('bellRing', (p) => {
    console.log("Class is over", p);
})

/* // Trigger event / emit event / raise event
emitter.emit('bellRing', 'first period');   // you can pass multiple parameter */



// event emit from other file
school.periodStart();