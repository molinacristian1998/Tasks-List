import React, { useState } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import Button from "./Button";
import "./master.min.css";

//

//

//

const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);
  const [open, setOpen] = useState(0);

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
        let filtered = task.filter((x) => x.id !== open.id);
        setTask(filtered);
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

  const openTask = (id) => {
    let oneTask = Object.values(task).filter((x) => x.id === id);
    oneTask = oneTask[0];
    setOpen(oneTask);
  };

  const closeTask = () => {
    setOpen(0);
  };

  return { task, open, addTask, deleteTask, completeTask, openTask, closeTask };
};

//

//

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
  const initialState = {
    folder: "Mis Tareas",
    tasks: [],
  };
  var localTask = JSON.parse(localStorage.getItem("tasks"));

  // usan de primer estado localStorage.tasks
  const { task, open, addTask, deleteTask, completeTask, openTask, closeTask } = useTasks(localTask);
  // se dividen las completadas de las pendientes
  var completed_tasks = Object.values(task).filter((x) => x.completed === true);
  // se suben las tareas filtradas
  localStorage.setItem("tasks", JSON.stringify(task));

  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED");
  };

  const deleteThis = () => {
    deleteTask("DELETE_TASK");
  };

  //

  //

  //

  return (
    <div className="app">
      <Button action="toggleAdd" image="../add-24px.svg" type="add" />
      <Header folder={initialState.folder} task={task} completed_tasks={completed_tasks} />

      <FocusTask open={open} onBack={() => closeTask()} onDelete={() => deleteThis()} />

      <AddTask onSubmit={(e) => addTask(e)} />
      {localTask[0] ? (
        <AllTasks
          task={task}
          onRemoveTask={(e) => deleteTask(e)}
          onCompleteTask={(id) => completeTask(id)}
          onDeleteCompleted={() => DeleteCompleted()}
          onOpenTask={(id) => {
            openTask(id);
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
