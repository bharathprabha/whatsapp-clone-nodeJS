const express = require("express");
const mongoose = require("mongoose");
const msgcollections = require("./dbModel.js");
const Pusher = require("pusher");
const cors = require("cors");

// app config
const app = express();
const pusher = new Pusher({
  appId: "1067293",
  key: "96dbe6f0a211a4df079a",
  secret: "f7c19c5c3a4ff59a6da4",
  cluster: "ap2",
  encrypted: true,
});

// app midddleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

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

const db = mongoose.connection;
db.once("open", () => {
  const msgCollection = db.collection("msgcollections");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        user: messageDetails.user,
        message: messageDetails.message,
        time: messageDetails.time,
        recevied: messageDetails.recevied,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

// api endpoints
app.get("/message/sync", (req, res) => {
  msgcollections.find((err, document) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(document);
    }
  });
});

app.post("/message/post", (req, res) => {
  const dbMessage = req.body;

  msgcollections.create(dbMessage, (err, data) => {
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
