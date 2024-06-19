import { Comment } from "@ant-design/compatible";
import { Avatar } from "antd";

const CommentComponent = ({ name, email, body }) => {
  return (
    <Comment
      author={
        <p>
          {name}, {email}
        </p>
      }
      avatar={
        <Avatar
          src={`https://ui-avatars.com/api/?name=${name}&background=random`}
          alt={name}
        />
      }
      content={<p>{body}</p>}
    />
  );
};

export default CommentComponent;
