import React from "react";

function AddTask({ onSubmit, title, folder }) {
  return (
    <form className="AddTask" onSubmit={onSubmit}>
      <div className="navbar">
        <img onClick={() => document.body.classList.remove("toggle")} src="../arrow_back-24px.svg" alt="" />
        <h1>Agregar tarea</h1>
        <img src="../tune-24px.svg" alt="fakealt" />
      </div>

      <p>Carpeta: {folder.name}</p>
      <input onChange={(e) => (title = e.target.value)} type="text" placeholder="Título"></input>
      <textarea id="form-description" placeholder="Descripción"></textarea>
      <input type="submit" id="cuack" value="Agregar Tarea"></input>
    </form>
  );
}

export default AddTask;
