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

const useFolders = (folders) => {
  const [folder, setFolder] = useState(folders);
  const [selectedFolder, setSelectedFolder] = useState(folders[0]);

  return { folder, selectedFolder };
};

const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);
  const [open, setOpen] = useState(0);

  const addTask = (event, folder) => {
    let array = getInputs(event);
    clearInputs(event);
    createTask(array, task, setTask, folder);
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
        setOpen(0);
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

  const renameTitle = (value, id) => {
    const mapTitle = (task, value, id) => {
      task.id === id ? (task.title = value) : (task.title = task.title);
      return task;
    };
    let renamed = task.map((task) => mapTitle(task, value, id));
    setTask(renamed);
  };

  return { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle };
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

const createTask = ({ title, description }, task, setTask, folder) => {
  let newTask = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
    folder: folder,
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
    folder: [
      { id: 1591637105929, name: "Mis Tareas", default: true },
      { id: 1591637136738, name: "Programación", default: false },
    ],
    tasks: [],
  };
  var localTask = JSON.parse(localStorage.getItem("tasks"));
  var localFolder = JSON.parse(localStorage.getItem("folder"));

  localStorage.setItem("folder", JSON.stringify(initialState.folder));

  if (!localTask) {
    localStorage.setItem("tasks", JSON.stringify(initialState.tasks));
  }

  const isTrue = (t) => {
    var response = !t ? false : true;
    return response;
  };

  console.log(isTrue(localTask));

  // usan de primer estado localStorage.tasks
  const { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle } = useTasks(localTask);
  const { folder, selectedFolder } = useFolders(localFolder);
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
      <Header folder={selectedFolder.name} task={task} completed_tasks={completed_tasks} />

      <FocusTask
        open={open}
        allfolder={folder}
        onBack={() => closeTask()}
        onTitleChange={(value, id) => renameTitle(value, id)}
        onDelete={() => deleteThis()}
      />

      <AddTask onSubmit={(e) => addTask(e, selectedFolder.id)} folder={selectedFolder} />
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
