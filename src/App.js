import react, { useState, useEffect } from "react";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";
import DeleteModal from "./Components/DeleteModal";

const App = () => {

  const getData = () => {
    fetch("./data/data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        updateComments(data.comments);
      });
  };

  let savedComments =
    localStorage.getItem("comments") !== null
      ? JSON.parse(localStorage.getItem("comments"))
      : getData();
  const [comments, updateComments] = useState(savedComments);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  // add replies
  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.map((data) => {
      if (data.id == id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type == "comment") {
      updatedComments.map((data) => {
        if (data.id == id) {
          data.content = content;
        }
      });
    } else if (type == "reply") {
        updatedComments.forEach((comment) => {
          comment.replies.map((data) => {
            if (data.id == id) {
              data.content = content;
            }
          })
        })
    }

    updateComments(updatedComments);
  }

  return (
    <div className="App">
      {comments.map((data) => (
        <Comment
          key={data.id}
          commentData={data}
          updateReplies={updateReplies}
          editComment={ editComment }
        />
      ))}
      <AddComment buttonValue={"send"} addComments={addComments} />
      <DeleteModal />
    </div>
  );
};

export default App;
