import React from "react";

function FocusTask({ open, allfolder, onBack, onDelete, onTitleChange }) {
  var { id, title, completed, folder } = open;

  const filterFolder = (f, a) => {
    let filtered = a.filter((x) => x.id === f);
    return filtered[0];
  };

  if (folder) {
    var folderName = filterFolder(folder, allfolder).name;
  }

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
        <input id="Rename-Input" type="text" value={title} onChange={(e) => onTitleChange(e.target.value, id)} />
        <p>Carpeta: {folder ? folderName : "Sin carpeta"}</p>

        <p>{completed ? "completado" : "incompleto"}</p>
      </div>
    </div>
  );
}

export default FocusTask;
