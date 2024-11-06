const mongoose = require('mongoose');
require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Db connected successfully");
        })
        .catch((error) => {
            console.log("Db facing connection issues");
            console.error(error);  // Log the actual error for debugging
            process.exit(1);       // Exit the process with a failure code
        });
};

module.exports = connectWithDb;
