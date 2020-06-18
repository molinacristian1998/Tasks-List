import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const switchFunct = (expr) => {
  switch (expr) {
    case "toggleAdd":
      document.body.classList.add("toggle");
      document.body.classList.add("overlay");
      document.getElementById("titleInput").focus();
      break;
    default:
      console.err("switch Error");
  }
};

const Button = ({ action, image, type }) => {
  const theme = useContext(ThemeContext);

  console.log(theme);

  return (
    <div>
      <button className={type} onClick={() => switchFunct(action)} style={{ background: theme.darkermain }}>
        <img src={image} alt="icon" />
      </button>
    </div>
  );
};

export default Button;
