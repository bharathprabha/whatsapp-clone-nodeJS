const express = require("express");
const mongoose = require("mongoose");
const Group = require("./dbModel.js");

// app config
const app = express();

// app midddleware
app.use(express.json());

//db config
const user = "admin";
const password = "05aAILgFLozE5mUQ";
const connectURL =
  "mongodb+srv://admin:05aAILgFLozE5mUQ@cluster0.gpgc3.mongodb.net/whatsapp?retryWrites=true&w=majority";
mongoose.connect(connectURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/", (req, res) => {
  const dbMessage = req.body;

  Group.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// app listenig
app.listen(8000, () => {
  console.log("server is listenig to port 8000");
});
