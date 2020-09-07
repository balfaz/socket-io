const { io } = require('../index');

//socket Message
io.on('connect', client => {
    console.log('client connect');
    client.on('disconnect', () => {
        console.log('client disconnect');
    });

    client.on('message', (payload) => {
        console.log('messaggio', payload);
        io.emit('message', { admin: 'New Message' });
    });
});

