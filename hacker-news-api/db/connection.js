const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

/**
 * Sets the connection to the database
 */
function startConnection() {
  // Initialize database connection
  try {
    mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("connected to db...")
    );
  } catch (err) {
    console.log(`could not connect to dabase -> ${err}`);
  }

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

module.exports.startConnection = startConnection;
