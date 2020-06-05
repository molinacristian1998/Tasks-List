import React from "react";

function FocusTask({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button>Delete</button>
    </div>
  );
}

export default FocusTask;
