import { useState, } from "react";

import "./Styles/Comment.scss";

import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";

const Reply = ({
  commentData,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);


  // adding reply
  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  const commentContent = () => {
    const text = commentData.content.trim().split(" ");
    const firstWord = text.shift().split(",");

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

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  // delete comment
  const deleteReply = () => {
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
        <CommentVotes
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          type="reply"
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />

          {commentContent()}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
          type="reply"
        />
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
      )}
      {commentData.replies.map((reply) => (
        <Reply
          key={reply.id}
          commentData={reply}
          addReply={addReply}
        />
      ))}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteReply}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Reply;
