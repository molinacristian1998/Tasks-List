import React from "react";

function FolderList({ folder, selectedFolder, onSelectFolder }) {
  var selectedId = selectedFolder.id;

  const toggle = () => {
    document.getElementById("FolderList").classList.remove("toggle");
  };

  var listMap = folder.map(({ id, name }) => (
    <div className={id === selectedId ? "selected" : ""} id={id} key={id} onClick={(e) => onSelectFolder(e)}>
      {name}
    </div>
  ));

  return (
    <div>
      <div id="FolderList">
        {listMap}
        <div className="NewFolder">Nueva Carpeta</div>
      </div>
      <div id="overlay" onClick={() => toggle()}></div>
    </div>
  );
}

export default FolderList;
