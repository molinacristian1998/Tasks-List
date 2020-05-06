import React, { useState } from "react";
import { SET_CONTACTS } from "./actions";

const body = document.body.classList;

const useTasks = () => {
  const [task, setTask] = useState();

  return { task };
};

function AddTask() {
  dispatch({ type: SET_CONTACTS, payload: response.data });

  return (
    <div className="addNew">
      <div className="navbar">
        <img onClick={() => (body.contains("toggle") ? body.remove("toggle") : body.add("toggle"))} src="../arrow_back-24px.svg" />
        <h1>Agregar tarea</h1>
        <img src="../tune-24px.svg" />
      </div>

      <img className="main" src="../create-24px.svg" />

      <form>
        <input id="form-title" type="text" placeholder="Task Title"></input>
        <textarea id="form-description" placeholder="Task Description"></textarea>
        <input type="submit" id="cuack" value="Agregar Tarea"></input>
      </form>
    </div>
  );
}

export default AddTask;
