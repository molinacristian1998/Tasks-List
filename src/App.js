import React, { useState, useReducer } from "react";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import "./master.min.css";

// Se setea la fecha en NOMBREMES DD, AAAA
var d = new Date();
var months = ["January", "February", "March", "April", "Mayo", "June", "July", "August", "September", "October", "November", "December"];
var date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);

  const addTask = (txt) => {
    setTask(txt);
  };

  return { task, addTask };
};

function App() {
  const initialState = {
    folder: "Mis Tareas",
    tasks: [
      {
        id: 1,
        title: `Hacer que la imagen de "completed" cambie`,
        description: `Lorem ipsum dolor sit amet`,
        completed: true,
      },
      {
        id: 2,
        title: `Hacer que se vean todas las tareas`,
        description: `Lorem ipsum dolor sit amet`,
        completed: true,
      },
      {
        id: 3,
        title: `Poder agregar una tarea`,
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 4,
        title: `Poder eliminar una tarea`,
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 5,
        title: "Hacer que el botón sea clickeable",
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 6,
        title: `Hacer que el botón cambie el estado a "Hecho"`,
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 7,
        title: `Hacer que el botón cambie el estado a "Hecho"`,
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 8,
        title: `Hacer que el botón cambie el estado a "Hecho"`,
        description: `Lorem ipsum dolor sit amet`,
        completed: false,
      },
      {
        id: 9,
        title: `Separar tareas sin terminar de terminadas`,
        description: `Texto de ejemplo`,
        completed: false,
      },
    ],
  };

  const body = document.body.classList;
  const completed_tasks = initialState.tasks.filter((x) => x.completed === true);
  const remaining_tasks = initialState.tasks.filter((x) => x.completed === false);
  const percent = parseInt((completed_tasks.length / initialState.tasks.length) * 100);

  const { task, addTask } = useTasks(initialState.tasks);

  const appReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return {
          tasks: [...state.tasks, action.payload],
        };
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const add_task = () => {
    const title = document.getElementById("form-title").value;
    const description = document.getElementById("form-description").value;

    const newTask = { title, description };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
  };

  return (
    <div className="app">
      <button className="add">
        <img onClick={() => (body.contains("toggle") ? body.remove("toggle") : body.add("toggle"))} src="../add-24px.svg" />
      </button>

      <div className="header">
        <img src="../sort-24px.svg" />

        <h1>{initialState.folder}</h1>

        <p className="date">{date}</p>

        <div className="info">
          <div>
            <h2>{initialState.tasks.length}</h2>
            <p>Tareas</p>
          </div>
          <div>
            <h2>{completed_tasks.length}</h2>
            <p>Completadas</p>
          </div>

          <p className="percent">{percent}% hecho</p>
        </div>
      </div>

      <AddTask />
      <AllTasks completed={completed_tasks} remaining={remaining_tasks} />
    </div>
  );
}

export default App;
