const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const hackerNews = require('./hn-api/routes/hacker-news');
require('dotenv/config');

var corsOptions = {
    origin: [ '*' ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware for parse requests into json
app.use(cors(corsOptions));
app.use(express.json());

// Middelware for handling requests to /posts to the other module
const hitsRoute = require('./routes/hits');
app.use('/api/hits', hitsRoute);

// fetch data from hacker news every hour
try {
    setInterval(async (x, y) => { 
        await hackerNews.getHitsFromHackerNews();
    }, 3600000);
} catch(err) {
    console.log(err);
}

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

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}`));
