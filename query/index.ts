import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

type ModerationStatus = "approved" | "pending" | "rejected";
type Comment = {
  id: string;
  content: string;
  status: ModerationStatus;
};
type Post = {
  id: string;
  title: string;
  comments: Comment[];
};
type EventType = "PostCreated" | "CommentCreated" | "CommentUpdated";

const posts: { [id: string]: Post } = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (type: EventType, data: any) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const comments = posts[data.postId].comments.filter(
      (c) => c.id !== data.id
    );
    posts[data.postId].comments = [
      ...comments,
      { id: data.id, content: data.content, status: data.status },
    ];
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get("http://localhost:4005/events");
  res.data.forEach((event) => {
    console.log("Processing event: ", event);
    handleEvent(event.type, event.data);
  });
});
