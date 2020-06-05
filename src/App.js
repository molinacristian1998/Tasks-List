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
    console.log("Updated");
  });

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
  let array = { title: var_title, description: var_description };
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
  event.target.querySelectorAll("textarea")[0].value = "";
  document.body.classList.remove("toggle");
};

//

//

//

function App() {
  // se conserva un initialState de las tareas por si hay algún error

  var focusTask;

  var oneTask;

  const OpenTask = (id) => {
    oneTask = Object.values(task).filter((x) => x.id === id);
    oneTask = oneTask[0];

    focusTask = (oneTask) => {
      return `<FocusTask task={oneTask} />`;
    };
  };

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

  //

  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED");
  };

  //

  return (
    <div className="app">
      <Button action="toggleAdd" image="../add-24px.svg" type="add" />
      <Header folder={initialState.folder} task={task} completed_tasks={completed_tasks} />

      {focusTask}

      <AddTask onSubmit={(e) => addTask(e)} />
      {localTask[0] ? (
        <AllTasks
          task={task}
          onRemoveTask={(e) => deleteTask(e)}
          onCompleteTask={(id) => completeTask(id)}
          onDeleteCompleted={() => DeleteCompleted()}
          onOpenTask={(id) => {
            OpenTask(id);
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
