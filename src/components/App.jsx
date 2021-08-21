import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {

  const [Tasks, setTasks] = useState([]);

  useEffect(()=>{
    axios
    .get("/all")
    .then(res => setTasks(res.data))
    .catch(err => console.error(err));
  });
  
  console.log(Tasks);
  function addNote(newNote) {
    const params = JSON.stringify({
      "title": newNote.title,
      "content": newNote.content
    });

    axios
      .post("/add",params,{
        "headers": {
        "content-type": "application/json",
        },})
      .then(res => console.log(res))
      .catch(err => console.error(err));

    axios
      .get("/all")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }

  function deleteNode(id) {

    axios
      .delete("http://localhost:8080/del/"+id) // check
      .then(res => console.log(res))
      .catch(err => console.error(err));

    axios
      .get("/all")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
      />
      {Tasks.map((task) => {
        return <Note
          key={task._id}
          id={task._id}
          title={task.title}
          content={task.content} 
          onDelete={deleteNode}
        />;
      })}
      <Footer />
    </div>
  );
}

export default App;