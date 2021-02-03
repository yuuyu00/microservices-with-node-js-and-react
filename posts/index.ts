import * as express from "express";
import * as bodyParser from "body-parser";
import { randomBytes } from "crypto";
import * as cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("Recieved Event", req.body.type);
});

app.listen(4000, () => console.log("Listening on 4000"));
