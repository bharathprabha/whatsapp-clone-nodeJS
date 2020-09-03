const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(8000, () => {
  console.log("server is listennig to port 8000");
});
