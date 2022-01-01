import react, { useState, useEffect } from "react";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";

const App = () => {
  const [comments, updateComments] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  }

  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.map((data) => {
      if (data.id == id) {
        data.replies = [...replies];
      };
    })
    updateComments(updatedComments);
  }

  return (
    <div className="App">
      {comments.map((data) => (
        <Comment key={ data.id } commentData={ data } updateReplies={ updateReplies } />
      ))}
      <AddComment buttonValue={ 'send' } addComments={ addComments }  />
    </div>
  );
};

export default App;
