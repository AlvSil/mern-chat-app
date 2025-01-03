const mongoose = require('mongoose');

mongoose.connect(process.env.CONN_STRING);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('DB connection successful');
});

db.on('err', () => {
    console.log('DB connection failed');
});

module.exports = db;