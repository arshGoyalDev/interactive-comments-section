import React from "react";
import Reply from "./Reply";

let ReplyContainer = ({ commentData, commentPostedTime, addReply, editComment }) => {
  return (
    <div className="reply-container">
      {commentData.map((data) => (
        <Reply
          key={data.id}
          commentData={data}
          commentPostedTime={commentPostedTime}
          addNewReply={addReply}
          editComment={editComment}
        />
      ))}
    </div>
  );
};

export default ReplyContainer;
