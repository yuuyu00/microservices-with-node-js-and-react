import { Comment } from "./PostList";

type Props = {
  comments: Comment[];
};
export const CommentList = ({ comments }: Props) => {
  const getContent = (comment: Comment) => {
    if (comment.status === "approved") return comment.content;

    if (comment.status === "pending")
      return "This comment is awaitin moderation";

    if (comment.status === "rejected") return "This comment has been rejected";
  };
  return (
    <ul>
      {comments.map((comment) => (
        <li>{getContent(comment)}</li>
      ))}
    </ul>
  );
};
