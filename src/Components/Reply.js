import React, { useState, useEffect } from "react";
import "./Styles/Comment.scss";
import { ReactComponent as IconPlus } from "../Assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../Assets/images/icon-minus.svg";
import { ReactComponent as IconReply } from "../Assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../Assets/images/icon-edit.svg";
import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";

let Reply = ({ commentData, commentPostedTime, addNewReply }) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");

  // get time from comment posted
  let createdAt = new Date(commentData.createdAt);
  let today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
  }, [time]);

  setInterval(() => {
    setTime(commentPostedTime(differenceInTime));
  }, 60000);

  // up vote and down vote
  let clickHandler = () => {};

  // adding reply
  let counter = false;
  let showAddComment = () => {
    counter ? setReplying(false) : setReplying(true);
    counter = true;
  };

  let addReply = (newReply) => {
    let updatedReplies = [...commentData.replies, newReply];
    addNewReply(newReply);
    setReplying(false);
  };

  let content = () => {
    let text = commentData.content.trim().split(" ");
    // text.split(',');
    let firstWord = text.shift().split(",");
    return (
      <div className="comment-content">
        <span className="replyingTo">{firstWord}</span>
        {text.join(" ")}
      </div>
    );
  };
  // $("#firstWord").html(function(){
  // });

  return (
    <div
      className={`comment-container ${
        commentData.replies[0] !== undefined ? "gap" : ""
      }`}
    >
      <div className="comment">
        <div className="comment--votes">
          <button
            className="plus-btn"
            onClick={clickHandler}
            aria-label="plus-btn"
          >
            <IconPlus />
          </button>
          <div className="votes-counter">{commentData.score}</div>
          <button
            className="minus-btn"
            onClick={clickHandler}
            aria-label="minus-btn"
          >
            <IconMinus />
          </button>
        </div>

        <div className="comment--body">
          <div className="comment--header">
            <div className={`profile-pic ${commentData.username}`}></div>
            <div className="username">{commentData.username}</div>
            {commentData.currentUser ? <div className="you-tag">you</div> : ""}
            <div className="comment-posted-time">{`${time} ago`}</div>
            <div className="comment--btn">
              <button
                className={`reply-btn ${
                  !commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showAddComment}
              >
                <IconReply /> Reply
              </button>
              <button
                className={`delete-btn ${
                  commentData.currentUser ? "" : "display--none"
                }`}
              >
                <IconDelete /> Delete
              </button>
              <button
                className={`edit-btn ${
                  commentData.currentUser ? "" : "display--none"
                }`}
              >
                <IconEdit /> Edit
              </button>
            </div>
          </div>
          {content()}
        </div>
        <div className="comment--footer">
          <div className="comment--votes">
            <button
              className="plus-btn"
              onClick={clickHandler}
              aria-label="plus-btn"
            >
              <IconPlus />
            </button>
            <div className="votes-counter">{commentData.score}</div>
            <button
              className="minus-btn"
              onClick={clickHandler}
              aria-label="minus-btn"
            >
              <IconMinus />
            </button>
          </div>
          <div className="comment--btn">
            <button
              className={`reply-btn ${
                !commentData.currentUser ? "" : "display--none"
              }`}
              onClick={showAddComment}
            >
              <IconReply /> Reply
            </button>
            <button
              className={`delete-btn ${
                commentData.currentUser ? "" : "display--none"
              }`}
            >
              <IconDelete /> Delete
            </button>
            <button
              className={`edit-btn ${
                commentData.currentUser ? "" : "display--none"
              }`}
            >
              <IconEdit /> Edit
            </button>
          </div>
        </div>
      </div>

      {replying ? (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
      ) : (
        ""
      )}
      {commentData.replies.map((data) => (
        <Reply
          key={data.id}
          commentData={data}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default Reply;
