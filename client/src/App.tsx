import React from "react";
import { PostCreate } from "./PostCreate";
import { PostList } from "./PostList";

export const App = () => {
  return (
    <div className="ui container">
      <h1>Create Post</h1>
      <PostCreate />
      <h1>Post List</h1>
      <PostList />
    </div>
  );
};
