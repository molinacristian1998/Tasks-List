import React from "react";

// Se setea la fecha en MES DD, AAAA
var d = new Date();
var months = ["Ene", "Feb", "Marzo", "Abril", "Mayo", "Jun", "Jul", "Agos", "Sept", "Oct", "Nov", "Dic"];
var date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

function Header({ folder, task, completed_tasks }) {
  //
  const filterByFolder = (task) => ({ id }) => {
    let filtered = task.filter((x) => x.folder === id);
    return filtered;
  };

  task = filterByFolder(task)(folder);

  const showFList = () => {
    let doc = document.getElementById("FolderList");
    doc.classList.add("toggle");
  };

  var percent = parseInt((completed_tasks.length / task.length) * 100);

  return (
    <div className="header">
      <img onClick={() => showFList()} src="../sort-24px.svg" alt="" />

      <h1>{folder.name}</h1>

      <p className="date">{date}</p>

      <div className="info">
        <p className="percent">
          {completed_tasks.length} de {task.length} tareas completadas
          <div id="completed-bar">
            <span style={{ width: percent + "%" }}></span>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Header;
