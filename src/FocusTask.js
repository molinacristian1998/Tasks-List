import React from "react";

function FocusTask({ open, onBack, onDelete }) {
  var { id, title, description, completed } = open;

  return (
    <div id="FocusTask" className={id ? "toggle" : ""}>
      <div className="head">
        <button onClick={() => onBack()}>
          <img src="../arrow_back-24px.svg" alt="icon" />
        </button>
        <button onClick={() => onDelete()}>
          <img src="../delete-24px.svg" alt="icon" />
        </button>
      </div>

      <div className="text">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{completed ? "completado" : "incompleto"}</p>
      </div>
    </div>
  );
}

export default FocusTask;
