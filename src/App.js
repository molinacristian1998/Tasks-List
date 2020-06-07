import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import Button from "./Button";
import "./master.min.css";

// useState de las tareas
const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);

  const addTask = (event) => {
    let array = getInputs(event);
    clearInputs(event);
    createTask(array, task, setTask);
    event.preventDefault();
  };

  const completeTask = (id) => {
    id = Number(id);
    const handleComplete = (task, slctId) => {
      if (task.id === slctId) {
        task.completed = !task.completed;
      }
      return task;
    };
    let completed = task.map((task) => handleComplete(task, id));
    setTask(completed);
  };

  const deleteTask = (dltCase) => {
    switch (dltCase) {
      case "DELETE_TASK":
        break;
      case "DELETE_COMPLETED":
        let result = task.filter((x) => x.completed === false);
        setTask(result);
        localStorage.setItem("tasks", JSON.stringify(result));
        break;
      default:
        console.warn("No se seleccionó case");
    }
  };

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    console.log("useEffect");
  });

  const openTask = (id) => {
    let oneTask = Object.values(task).filter((x) => x.id === id);
    oneTask = oneTask[0];

    var returned;

    if (oneTask) {
      returned = <FocusTask task={oneTask} />;
    } else {
      returned = null;
    }
    return returned;
  };

  return { task, addTask, deleteTask, completeTask, openTask };
};

//

const getInputs = (event) => {
  let title = event.target.querySelectorAll("input")[0].value;
  let description = event.target.querySelectorAll("textarea")[0].value;
  title = title ? title : "";
  description = description ? description : "";
  let array = { title: title, description: description };
  return array;
};

const createTask = ({ title, description }, task, setTask) => {
  let newTask = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
  };
  let concat = task.concat(newTask);
  setTask(concat);
};

const clearInputs = (event) => {
  event.target.querySelectorAll("input")[0].value = "";
  event.target.querySelectorAll("textarea")[0].value = "";
  document.body.classList.remove("toggle");
};

//

//

//

function App() {
  // se conserva un initialState de las tareas por si hay algún error

  var selectedId = undefined;

  const selectId = (id) => {
    selectedId = id;
  };

  const initialState = {
    folder: "Mis Tareas",
    tasks: [],
  };
  // se obtiene localStorage.tasks
  var localTask = JSON.parse(localStorage.getItem("tasks"));

  // usan de primer estado localStorage.tasks
  const { task, addTask, deleteTask, completeTask, openTask } = useTasks(localTask);
  // se dividen las completadas de las pendientes
  var completed_tasks = Object.values(task).filter((x) => x.completed === true);
  // se suben las tareas filtradas
  localStorage.setItem("tasks", JSON.stringify(task));

  //

  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED");
  };

  //

  return (
    <div className="app">
      <Button action="toggleAdd" image="../add-24px.svg" type="add" />
      <Header folder={initialState.folder} task={task} completed_tasks={completed_tasks} />

      {openTask(selectedId)}

      <AddTask onSubmit={(e) => addTask(e)} />
      {localTask[0] ? (
        <AllTasks
          task={task}
          onRemoveTask={(e) => deleteTask(e)}
          onCompleteTask={(id) => completeTask(id)}
          onDeleteCompleted={() => DeleteCompleted()}
          onOpenTask={(id) => {
            selectId(id);
          }}
        />
      ) : (
        <div className="noTasks">
          <p>Todavía no hay tareas</p>
        </div>
      )}
    </div>
  );
}

export default App;
