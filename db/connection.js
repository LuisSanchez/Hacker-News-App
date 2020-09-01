const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

function startConnection() {
    // Initialize database connection
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('connected to db...'));
    } catch (err) {
        console.log(`could not connect ${err}`);
    }

    mongoose.connection.on('error', err => {
        console.log(err);
    });
}

module.exports.startConnection = startConnection;
