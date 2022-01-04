const EventEmitter = require('events');

class School extends EventEmitter {
    periodStart() {
        console.log("class started...");

        setTimeout(() => {
            // Trigger event / emit event / raise event
            this.emit('bellRing', 'first period');   // you can pass multiple parameter
        }, 500)
    }
}

module.exports = School;