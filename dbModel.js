const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: String,
  user: String,
  time: String,
});

module.exports = mongoose.model("Group", messageSchema);
