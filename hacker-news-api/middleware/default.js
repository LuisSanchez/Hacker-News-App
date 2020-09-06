const express = require("express");
const app = express();
const cors = require("cors");
const hitsRoute = require("../routes/hits");
const path = require("path");

var corsOptions = {
  origin: [
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost",
    "http://luissanchez-hacker-news-client.eastus2.azurecontainer.io",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware to accept CORS
app.use(cors(corsOptions));
// Middleware for parse requests into json
app.use(express.json());

// Middelware for handling requests to /posts to the other module
app.use("/api/hits", hitsRoute);

// 404 pages
app.set("views", path.join(__dirname, "../public/404"));
app.use((req, res, next) => {
  res.sendFile("index.html", { root: app.get("views") });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
