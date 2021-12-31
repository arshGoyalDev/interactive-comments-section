import React, { useState } from "react";
import "./Styles/AddComment.scss";

const AddComment = () => {
  const [comment, setComment] = useState("");

  let changeHandler = (e) => {
    setComment(e.target.value);
  };

  let clickHandler = () => {
    console.log(comment);
  };

  return (
    <div className="add-comment">
      <div className="profile-pic"></div>
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={comment}
        onChange={changeHandler}
      ></textarea>

      <div className="send-btn-container">
        <div className="profile-pic"></div>
        <button className="send-btn" onClick={clickHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AddComment;
