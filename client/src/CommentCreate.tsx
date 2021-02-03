import { useState } from "react";
import axios from "axios";

type Props = {
  postId: string;
};
export const CommentCreate = ({ postId }: Props) => {
  const [comment, setComment] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment("");
  };

  return (
    <div>
      <form action="" className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label>New Comment</label>
          <input
            value={comment}
            type="text"
            className="ui input"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="ui primary button">Submit</button>
      </form>
    </div>
  );
};
