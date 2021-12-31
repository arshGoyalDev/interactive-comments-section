import react, { useState, useEffect } from "react";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";

const App = () => {
  const [comments, updateComments] = useState([]);

  const getData = () => {
    fetch("./data.json", {
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

  return (
    <div className="App">
      {comments.map((data) => (
        <Comment key={data.id} commentData={data} />
      ))}
      <AddComment />
    </div>
  );
};

export default App;
