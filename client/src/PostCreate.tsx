import React, { useState } from "react";
import axios from "axios";

export const PostCreate = () => {
  const [title, setTitle] = useState("");
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", { title });

    setTitle("");
  };

  return (
    <div>
      <form action="" className="ui form" onSubmit={onSubmit}>
        <div className="three wide field">
          <label>title</label>
          <input
            value={title}
            type="text"
            className="ui input"
            onChange={onChangeText}
          />
        </div>
        <button className="ui primary button">Submit</button>
      </form>
    </div>
  );
};
