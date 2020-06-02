import React, { useState } from "react";
import AddTask from "./AddTask";
import Header from "./Header";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import Button from "./Button";
import "./master.min.css";

// useState de las tareas
const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);

  const addTask = (event) => {
    let var_title = event.target.querySelectorAll("input")[0].value;
    let var_description = event.target.querySelectorAll("textarea")[0].value;
    if (!var_description) {
      var_description = "";
    }
    if (!var_title) {
      var_title = "";
    }

    event.target.querySelectorAll("input")[0].value = "";
    event.target.querySelectorAll("textarea")[0].value = "";
    document.body.classList.remove("toggle");
    var newvar = {
      id: Date.now(),
      title: var_title,
      description: var_description,
      completed: false,
    };

    let concat = task.concat(newvar);
    setTask(concat);

    event.preventDefault();
  };

  const completeTask = (event) => {
    let id = event.target.parentElement.id;

    for (let index = 0; index < tasks.length; index++) {
      if (task[index].id === id && task[index].completed === false) {
        task[index].completed = true;
      } else if (task[index].id === id && task[index].completed === true) {
        task[index].completed = false;
      }
    }
  };

  const deleteTask = (event) => {
    let id = event.target.parentElement.parentElement.id;

    let result = task.filter((x) => x.id !== id);
    setTask(result);

    //event.preventDefault();
  };

  return { task, addTask, deleteTask, completeTask };
};

function App() {
  // se conserva un initialState de las tareas por si hay algún error
  const initialState = {
    folder: "Mis Tareas",
    tasks: [],
  };
  // se obtiene localStorage.tasks
  var localTask = JSON.parse(localStorage.getItem("tasks"));

  // usan de primer estado localStorage.tasks
  const { task, addTask, deleteTask, completeTask } = useTasks(localTask);
  // se dividen las completadas de las pendientes
  var completed_tasks = Object.values(task).filter((x) => x.completed === true);
  var remaining_tasks = Object.values(task).filter((x) => x.completed === false);
  // se suben las tareas filtradas
  localStorage.setItem("tasks", JSON.stringify(task));

  return (
    <div className="app">
      <Button action="toggleAdd" image="../add-24px.svg" type="add" />

      <Header folder={initialState.folder} task={task} completed_tasks={completed_tasks} />

      <AddTask onSubmit={(e) => addTask(e)} />

      <FocusTask />

      {localTask[0] ? (
        <AllTasks onRemoveTask={(e) => deleteTask(e)} onCompleteTask={(e) => completeTask(e)} completed={completed_tasks} remaining={remaining_tasks} />
      ) : (
        <div className="noTasks">
          <p>Todavía no hay tareas</p>
        </div>
      )}
    </div>
  );
}

export default App;
