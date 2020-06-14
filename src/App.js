import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import FolderList from "./FolderList";
import Button from "./Button";
import "./master.min.css";

const useFolders = (localFolders) => {
  const [folder /*, setFolder*/] = useState(localFolders);
  const [selectedFolder, setSelectedFolder] = useState(localFolders[2]);

  const selectFolder = (e) => {
    let id = Number(e.target.id);
    let filtered = folder.filter((x) => x.id === id);
    let toObject = filtered[0];
    setSelectedFolder(toObject);
    document.getElementById("FolderList").classList.remove("toggle");
  };
  return { folder, selectedFolder, selectFolder };
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
      if (task.id === id) {
        task.title = value;
      }
      return task;
    };
    let renamed = task.map((task) => mapTitle(task, value, id));
    setTask(renamed);
  };

  return { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle };
};

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

function App() {
  const initialState = {
    folder: [],
    tasks: [],
  };

  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem("tasks", JSON.stringify(task));
  });

  var localTask = JSON.parse(localStorage.getItem("tasks"));
  var localFolder = JSON.parse(localStorage.getItem("folder"));

  if (!localTask) {
    localStorage.setItem("tasks", JSON.stringify(initialState.tasks));
  }
  if (!localFolder) {
    localStorage.setItem("folder", JSON.stringify(initialState.folder));
  }

  const { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle } = useTasks(localTask);
  const { folder, selectedFolder, selectFolder } = useFolders(localFolder);
  var completed_tasks = Object.values(task).filter((x) => x.completed === true && x.folder === selectedFolder.id);

  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED");
  };

  const deleteThis = () => {
    deleteTask("DELETE_TASK");
  };

  //

  const filterByFolder = (task) => ({ id }) => {
    let filtered = task.filter((x) => x.folder === id);
    return filtered;
  };
  const folder_task = filterByFolder(task)(selectedFolder);

  //

  return (
    <div className="app">
      <Button action="toggleAdd" image="../add-24px.svg" type="add" />
      <Header folder={selectedFolder} task={task} completed_tasks={completed_tasks} />

      <FolderList folder={folder} selectedFolder={selectedFolder} onSelectFolder={(id) => selectFolder(id)} />

      <FocusTask
        open={open}
        allfolder={folder}
        onBack={() => closeTask()}
        onTitleChange={(value, id) => renameTitle(value, id)}
        onDelete={() => deleteThis()}
      />

      <AddTask onSubmit={(e) => addTask(e, selectedFolder.id)} folder={selectedFolder} />
      {folder_task[0] ? (
        <AllTasks
          task={task}
          selectedFolder={selectedFolder}
          onRemoveTask={(e) => deleteTask(e)}
          onCompleteTask={(id) => completeTask(id)}
          onDeleteCompleted={() => DeleteCompleted()}
          onOpenTask={(id) => {
            openTask(id);
          }}
        />
      ) : (
        <div className="noTasks">
          <h1>Todavía no hay tareas</h1>
          <p>¿Qué esperas para agregar una? La puta que te parió.</p>
          <img src="../assets/img/blank_canvas.svg" alt="No tasks illustration" />
        </div>
      )}
    </div>
  );
}

export default App;
