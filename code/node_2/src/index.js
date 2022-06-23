const Events = require('events');

class MyEvents extends Events {
    find (...args) {
        //发布
        this.emit('find', ...args);
    };
};

let findEvent = new MyEvents();
//订阅
findEvent.on('find', (a, b) => {
    console.log('find订阅', a, b);
});

findEvent.find(10, 20);
