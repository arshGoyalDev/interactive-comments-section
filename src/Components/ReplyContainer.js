import react from "react";
import Reply from "./Reply";

let ReplyContainer = ({ commentData }) => {
  return (
    <div className="reply-container">
      {commentData.map((data) => (
        <Reply 
          key={data.id} 
          commentData={data} 
        />
      ))}
    </div>
  );
};

export default ReplyContainer;
