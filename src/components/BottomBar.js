import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function BottomBar({ folder, task, completed_tasks }) {
  const theme = useContext(ThemeContext);
  console.log(theme);

  const showFList = () => {
    document.getElementById("FolderList").classList.add("toggle");
    document.body.classList.add("overlay");
  };

  return (
    <div className="BottomBar" style={{ background: theme.main }}>
      <button onClick={() => showFList()}>
        <img style={{ "&:hover": { background: theme.darkermain } }} src="../assets/icons/menu-24px.svg" alt="" />
      </button>
      <button onClick={() => document.body.classList.remove("toggle")}>
        <img src="../assets/icons/home-24px.svg" alt="" />
      </button>
    </div>
  );
}

export default BottomBar;
