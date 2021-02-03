import { useState, useEffect } from "react";
import axios from "axios";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

type ModerationStatus = "approved" | "pending" | "rejected";
export type Comment = {
  id: string;
  content: string;
  status: ModerationStatus;
};
type Post = {
  id: string;
  title: string;
  comments: Comment[];
};
type Posts = {
  [id: string]: Post;
};

export const PostList = () => {
  const [posts, setPosts] = useState<Posts>({});
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:4002/posts");
      setPosts(res.data);
    })();
  }, []);

  useEffect(() => {
    console.log(
      Object.values(posts).map((post) =>
        post.comments.map((comment) => comment.status)
      )
    );
  }, [posts]);

  return (
    <div className="ui cards">
      {Object.values(posts).map((post) => (
        <div className="card">
          <div className="content">{post.title}</div>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      ))}
    </div>
  );
};
