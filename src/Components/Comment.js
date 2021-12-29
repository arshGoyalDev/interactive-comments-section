import react from "react";
import "./Styles/Comment.scss";
import { ReactComponent as IconPlus } from "../Assets/images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../Assets/images/icon-minus.svg";
import { ReactComponent as IconReply } from "../Assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../Assets/images/icon-edit.svg";
import ReplyContainer from "./ReplyContainer";

let Comment = ({ commentData }) => {
  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment--votes">
          <div className="plus-btn">
            <IconPlus />
          </div>
          <div className="votes-counter">{commentData.score}</div>
          <div className="minus-btn">
            <IconMinus />
          </div>
        </div>

        <div className="comment--body">
          <div className="comment--header">
            <div className={`profile-pic ${commentData.user.username}`}></div>
            <div className="username">{commentData.user.username}</div>
            <div className="comment-posted-time">{commentData.createdAt}</div>
            <div className="comment--btn">
              <button
                className={`reply-btn ${
                  !commentData.currentUser ? "" : "display--none"
                }`}
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
          <div className="comment-content">{commentData.content}</div>
        </div>
        <div className="comment--footer">
          <div className="comment--votes">
            <div className="plus-btn">
              <IconPlus />
            </div>
            <div className="votes-counter">{commentData.score}</div>
            <div className="minus-btn">
              <IconMinus />
            </div>
          </div>
          <div className="comment--btn">
            <button
              className={`reply-btn ${
                !commentData.currentUser ? "" : "display--none"
              }`}
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

      {commentData.replies == [] ? (
        ""
      ) : (
        <ReplyContainer
          key={commentData.replies.id}
          commentData={commentData.replies}
        />
      )}
    </div>
  );
};

export default Comment;
