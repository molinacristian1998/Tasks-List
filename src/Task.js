import React from "react";

function Task({ id, info, onClick, onComplete }) {
  return (
    <div id={id} className="Task">
      <img
        onClick={onComplete}
        alt="icon"
        className={info.completed ? "completed" : ""}
        src={info.completed ? "../radio_button_checked-24px.svg" : "../radio_button_unchecked-24px.svg"}
      />
      <div>
        <h1 onClick={onClick}>{info.title}</h1>
        <p>{info.description}</p>
      </div>
    </div>
  );
}

export default Task;
