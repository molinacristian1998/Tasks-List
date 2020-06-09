import React from "react";

function FocusTask({ open, allfolder, onBack, onDelete, onTitleChange }) {
  var { id, title, description, completed, folder } = open;

  const filterFolder = (f, a) => {
    let filtered = a.filter((x) => x.id === f);
    return filtered[0];
  };

  if (folder) {
    var folderName = filterFolder(folder, allfolder).name;
  }

  const changeTitle = (e) => {
    onTitleChange(e, id);
  };

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
        <p>Carpeta: {folder ? folderName : "Sin carpeta"}</p>
        <input type="text" value={title} onChange={(e) => changeTitle(e.target.value)} />

        <p>{description}</p>
        <p>{completed ? "completado" : "incompleto"}</p>
      </div>
    </div>
  );
}

export default FocusTask;
