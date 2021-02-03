import * as express from "express";
import * as bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.match(/orange/) ? "rejected" : "approved";

    axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
