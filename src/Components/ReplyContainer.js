import react from "react";
import Reply from "./Reply";

let ReplyContainer = ({ commentData, commentPostedTime, addReply }) => {
  return (
    <div className="reply-container">
      {commentData.map((data) => (
        <Reply
          key={data.id}
          commentData={data}
          commentPostedTime={commentPostedTime}
          addNewReply={addReply}
        />
      ))}
    </div>
  );
};

export default ReplyContainer;
