const mongoose = require("mongoose");

// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
const ENV = require("dotenv");
ENV.config();

//Connect to MongoDB
const connectDB = function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.log({
        MongoError: err,
      });
      process.exit(1);
    });
};

module.exports = connectDB;
