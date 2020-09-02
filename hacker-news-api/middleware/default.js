const express = require('express')
const app = express();
const cors = require('cors');
const hitsRoute = require('../routes/hits');

var corsOptions = {
    origin: 'http://localhost:4001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Middleware to accept CORS
app.use(cors(corsOptions));
// Middleware for parse requests into json
app.use(express.json());

// Middelware for handling requests to /posts to the other module
app.use('/api/hits', hitsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
