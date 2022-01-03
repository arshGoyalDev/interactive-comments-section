import React, { useEffect, useState } from "react";
import "./Styles/Comment.scss";
import { ReactComponent as IconPlus } from "../Assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../Assets/images/icon-minus.svg";
import { ReactComponent as IconReply } from "../Assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../Assets/images/icon-edit.svg";
import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";

let Comment = ({
  commentData,
  updateReplies,
  editComment,
  commentDelete,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  let createdAt = new Date(commentData.createdAt);
  let today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  function commentPostedTime(timeInMileSec) {
    let sec = (timeInMileSec / 1000).toFixed(0);
    let min = (timeInMileSec / (1000 * 60)).toFixed(0);
    let hrs = (timeInMileSec / (1000 * 60 * 60)).toFixed(0);
    let days = (timeInMileSec / (1000 * 60 * 60 * 24)).toFixed(0);
    let weeks = (timeInMileSec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
    let months = (timeInMileSec / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
    let years = (timeInMileSec / (1000 * 60 * 60 * 24 * 12)).toFixed(0);

    if (sec < 60) {
      return "seconds";
    } else if (min < 60) {
      return min + " mins";
    } else if (hrs < 24) {
      return hrs + " hrs";
    } else if (days < 7) {
      return days + " days";
    } else if (weeks < 4) {
      return weeks + " weeks";
    } else if (months < 12) {
      return months + " months";
    } else {
      return years + " year";
    }
  }

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
    let replies = [...commentData.replies, newReply];
    updateReplies(replies, commentData.id);
    setReplying(false);
  };

  // edit comment
  let showEditComment = () => {
    setEditing(true);
  };

  let updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  // delete comment
  let showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  let deleteComment = (id, type) => {
    let finalType = type !== undefined ? type : "comment";
    let finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData.replies[0] !== undefined ? "reply-container-gap" : ""
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
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
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
      {commentData.replies == [] ? (
        ""
      ) : (
        <ReplyContainer
          key={commentData.replies.id}
          commentData={commentData.replies}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}

      {deleting ? (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
