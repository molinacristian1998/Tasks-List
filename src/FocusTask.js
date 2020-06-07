import React from "react";

function FocusTask({ open, onBack, onDelete }) {
  var { id, title, description, completed } = open;

  return (
    <div id="FocusTask" className={id ? "toggle" : ""}>
      <div>
        <button onClick={() => onBack()}>Back</button>
        <button onClick={() => onDelete()}>Delete</button>
      </div>

      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default FocusTask;
