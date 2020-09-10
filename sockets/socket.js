const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Pantera'));
bands.addBand(new Band('Apocalyptica'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Pink Floyd'));

//socket Message
io.on('connect', client => {

    client.emit('active-bands', bands.getBands());

    console.log('client connect');
    client.on('disconnect', () => {
        console.log('client disconnect');
    });

    client.on('message', (payload) => {
        console.log('messaggio', payload);
        io.emit('message', { admin: 'New Message' });
    });

    client.on('new-message', (payload) => {
        //io.emit('new-message', payload);
        client.broadcast.emit('new-message', payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});

