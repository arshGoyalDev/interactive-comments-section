import React, { useState, useEffect } from "react";
import "./Styles/Comment.scss";
import { ReactComponent as IconPlus } from "../Assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../Assets/images/icon-minus.svg";
import { ReactComponent as IconReply } from "../Assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../Assets/images/icon-edit.svg";
import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";

let Reply = ({
  commentData,
  commentPostedTime,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  let createdAt = new Date(commentData.createdAt);
  let today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    localStorage.setItem("voteState", vote);
  }, [differenceInTime, commentPostedTime, vote]);

  setInterval(() => {
    setTime(commentPostedTime(differenceInTime));
  }, 60000);

  // up vote and down vote
  let upVote = () => {
    if (vote === false) {
      let n = score + 1;
      setScore(n);
      updateScore(n, commentData.id, "reply");
      setVoted(true);
    }
  };

  let downVote = () => {
    if (vote === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, commentData.id, "reply");
      setVoted(false);
    }
  };
  // adding reply
  let counter = false;
  let showAddComment = () => {
    counter ? setReplying(false) : setReplying(true);
    counter = true;
  };

  let addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  let commentContent = () => {
    let text = commentData.content.trim().split(" ");
    let firstWord = text.shift().split(",");

    return !editing ? (
      <div className="comment-content">
        <span className="replyingTo">{firstWord}</span>
        {text.join(" ")}
      </div>
    ) : (
      <textarea
        className="content-edit-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    );
  };

  // edit comment
  let showEditComment = () => {
    setEditing(true);
  };

  let updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  // delete comment
  let showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  let deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData.replies[0] !== undefined ? "gap" : ""
      }`}
    >
      <div className="comment">
        <div className="comment--votes">
          <button className="plus-btn" onClick={upVote} aria-label="plus-btn">
            <IconPlus />
          </button>
          <div className="votes-counter">{commentData.score}</div>
          <button
            className="minus-btn"
            onClick={downVote}
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
                onClick={showDeleteModal}
              >
                <IconDelete /> Delete
              </button>
              <button
                className={`edit-btn ${
                  commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showEditComment}
              >
                <IconEdit /> Edit
              </button>
            </div>
          </div>
          {commentContent()}
          {editing ? (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="comment--footer">
          <div className="comment--votes">
            <button className="plus-btn" onClick={upVote} aria-label="plus-btn">
              <IconPlus />
            </button>
            <div className="votes-counter">{commentData.score}</div>
            <button
              className="minus-btn"
              onClick={downVote}
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
              onClick={showDeleteModal}
            >
              <IconDelete /> Delete
            </button>
            <button
              className={`edit-btn ${
                commentData.currentUser ? "" : "display--none"
              }`}
              onClick={showEditComment}
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

      {deleting ? (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteReply}
          setDeleteModalState={setDeleteModalState}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Reply;
