import React from "react";

function FocusTask({ task }) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <button>Delete</button>
    </div>
  );
}

export default FocusTask;
