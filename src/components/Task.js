import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Task({ id, info, onOpen, onComplete }) {
  const theme = useContext(ThemeContext);

  console.log(theme);

  return (
    <div id={id} className="Task">
      <img
        onClick={onComplete}
        className={info.completed ? "completed" : ""}
        src={info.completed ? "../radio_button_checked-24px.svg" : "../radio_button_unchecked-24px.svg"}
        alt="icon"
      />
      <div onClick={(e) => onOpen(id)}>
        <p style={{ color: theme.text }}>{info.title}</p>
      </div>
    </div>
  );
}

export default Task;
