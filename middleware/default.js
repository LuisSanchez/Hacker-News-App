const express = require('express')
const app = express();
const cors = require('cors');
const hitsRoute = require('../routers/hits.router');

var corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware for parse requests into json
app.use(cors(corsOptions));
app.use(express.json());

// Middelware for handling requests to /posts to the other module
app.use('/api/hits', hitsRoute);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
