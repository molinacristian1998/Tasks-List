import React from "react";

// Se setea la fecha en MES DD, AAAA
var d = new Date();
var months = ["Ene", "Feb", "Marzo", "Abril", "Mayo", "Jun", "Jul", "Agos", "Sept", "Oct", "Nov", "Dic"];
var date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

function Header({ folder, task, completed_tasks }) {
  var percent = parseInt((completed_tasks.length / task.length) * 100);

  return (
    <div className="header">
      <img src="../sort-24px.svg" alt="" />

      <h1>{folder}</h1>

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
