import React from "react";

// Se setea la fecha en MES DD, AAAA
var d = new Date();
var months = ["Ene", "Feb", "Marzo", "Abril", "Mayo", "Jun", "Jul", "Agos", "Sept", "Oct", "Nov", "Dic"];
var date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

var hour = d.getHours();
const dayTime = ["noon", "afternoon", "afternoon", "afternoon", "afternoon", "evening(5)"];

var user = "Cristian";

console.log("Mensaje de prueba: Good " + dayTime[hour] + ", " + user);

function Header({ folder, task, completed_tasks }) {
  const filterByFolder = (task) => ({ id }) => {
    let filtered = task.filter((x) => x.folder === id);
    return filtered;
  };

  task = filterByFolder(task)(folder);

  var percent = parseInt((completed_tasks.length / task.length) * 100);

  return (
    <div className="header">
      <h1>{folder.name}</h1>
      <p className="date">{date}</p>
      <div className="info">
        <div className="percent">
          <p>
            {completed_tasks.length} de {task.length} tareas completadas
          </p>
          <div id="completed-bar">
            <span style={{ width: percent + "%" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
