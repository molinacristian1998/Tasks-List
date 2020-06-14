import React from "react";

function Task({ id, info, onOpen, onComplete }) {
  return (
    <div id={id} className="Task">
      <img
        onClick={onComplete}
        className={info.completed ? "completed" : ""}
        src={info.completed ? "../radio_button_checked-24px.svg" : "../radio_button_unchecked-24px.svg"}
        alt="icon"
      />
      <div onClick={(e) => onOpen(id)}>
        <p>{info.title}</p>
      </div>
    </div>
  );
}

export default Task;
