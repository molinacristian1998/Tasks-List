import React from "react";

function FocusTask(open) {

  var { id, title, description, completed } = open.open;

  return (
    <div className="FocusTask">
      <h1>{title}</h1>
      <p>{description}</p>
      <button>Delete</button>
    </div>
  );
}

export default FocusTask;
