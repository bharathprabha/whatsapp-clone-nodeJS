const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: String,
  user: String,
  time: String,
  recevied: Boolean,
});

module.exports = mongoose.model("msgcollections", messageSchema);
