import React from "react";

const switchFunct = (expr) => {
  switch (expr) {
    case "toggleAdd":
      document.getElementById("AddTask").classList.add("toggle");
      document.getElementById("overlay").classList.add("toggle");
      document.getElementById("titleInput").focus();
      break;
    default:
      console.err("switch Error");
  }
};

const Button = ({ action, image, type }) => {
  return (
    <div>
      <button className={type} onClick={() => switchFunct(action)}>
        <img src={image} alt="icon" />
      </button>
    </div>
  );
};

export default Button;
