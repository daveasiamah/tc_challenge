const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "publisher", "seller"],
    default: "admin",
    required: true,
  },
  date_created: {
    type: String,
    default: Date.now(),
  },
  date_updated: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
