import react from "react";
import Comment from "./Comment";

let ReplyContainer = ({ commentData }) => {
  return (
    <div className="reply-container">
      {commentData.map((data) => (
        <Comment key={data.id} commentData={data} />
      ))}
    </div>
  );
};

export default ReplyContainer;
