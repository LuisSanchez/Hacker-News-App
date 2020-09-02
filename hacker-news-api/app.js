const middleware = require('./middleware/default');
const conn = require('./db/connection');
const { job } = require('./jobs/hacker-news');

// Makes the conn to the mongodb
conn.startConnection();

// creates default middleware for the server requests
middleware.app;

job.checkIfIsFirstConnection().then(res => {
    if (res) console.log('First population to dabase successed');
});
if (job.populateDBJob()) console.log(`Database updated at ${Date.now}`);
