import React from "react";

// Se setea la fecha en MES DD, AAAA
var d = new Date();
var months = ["Ene", "Feb", "Marzo", "Abril", "Mayo", "Jun", "Jul", "Agos", "Sept", "Oct", "Nov", "Dic"];
var date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

function Header({ folder, task, completed_tasks }) {
  //

  const showFList = () => {
    let doc = document.getElementById("FolderList");
    doc.classList.add("toggle");
  };

  var percent = parseInt((completed_tasks.length / task.length) * 100);

  const filterByFolder = (task) => ({ id }) => {
    let filtered = task.filter((x) => x.folder === id);
    return filtered;
  };

  task = filterByFolder(task)(folder);

  return (
    <div className="header">
      <img onClick={() => showFList()} src="../sort-24px.svg" alt="" />

      <h1>{folder.name}</h1>

      <p className="date">{date}</p>

      <div className="info">
        <div>
          <h2>{task.length}</h2>
          <p>Tareas</p>
        </div>
        <div>
          <h2>{completed_tasks.length}</h2>
          <p>Completadas</p>
        </div>

        <p className="percent">{percent}% hecho</p>
      </div>
    </div>
  );
}

export default Header;
