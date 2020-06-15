import React from "react";

function BottomBar({ folder, task, completed_tasks }) {
  const showFList = () => {
    let doc = document.getElementById("FolderList");
    doc.classList.add("toggle");
  };

  return (
    <div className="BottomBar">
      <button onClick={() => showFList()}>
        <img src="../assets/icons/menu-24px.svg" alt="" />
      </button>
      <button onClick={() => document.body.classList.remove("toggle")}>
        <img src="../assets/icons/home-24px.svg" alt="" />
      </button>
    </div>
  );
}

export default BottomBar;
