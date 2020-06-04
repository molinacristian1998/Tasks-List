import React, { useState } from "react";
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
    console.log("completeTask");

    const handleComplete = (task, thisid) => {
      for (let i = 0; i < tasks.length; i++) {
        if (task[i].id === thisid) {
          task[i].completed ? (task[i].completed = false) : (task[i].completed = true);
        }
      }
    };

    handleComplete(task, Number(id));
  };

  const deleteTask = (event) => {
    let id = event.target.parentElement.parentElement.id;

    let result = task.filter((x) => x.id !== id);
    setTask(result);

    //event.preventDefault();
  };

  return { task, addTask, deleteTask, completeTask };
};
//

//

//

//

const getInputs = (event) => {
  let var_title = event.target.querySelectorAll("input")[0].value;
  let var_description = event.target.querySelectorAll("textarea")[0].value;
  if (!var_description) {
    var_description = "";
  }
  if (!var_title) {
    var_title = "";
  }

  let array = [var_title, var_description];
  return array;
};

const createTask = ({ title, description }, task, setTask) => {
  var newvar = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
  };

  let concat = task.concat(newvar);
  setTask(concat);
};

const clearInputs = (event) => {
  event.target.querySelectorAll("input")[0].value = "";
  event.target.querySelectorAllevent.target.parentElement.id("textarea")[0].value = "";
  document.body.classList.remove("toggle");
};

//

//

//

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
        <AllTasks
          onRemoveTask={(e) => deleteTask(e)}
          task={task}
          onCompleteTask={(id) => completeTask(id)}
          completed={completed_tasks}
          remaining={remaining_tasks}
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
