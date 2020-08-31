const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

var corsOptions = {
    origin: [
        'http://example.com', 
        'http://localhost:3750',
        'chrome-search://local-ntp',
        'https://luissanchez.github.io'
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware for parse requests into json
app.use(cors(corsOptions));
app.use(express.json());

// Middelware for handling requests to /posts to the other module
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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