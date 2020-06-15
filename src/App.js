import React, { useState, useEffect } from "react";
import Button from "./Button";
import Header from "./Header";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import FolderList from "./FolderList";
import BottomBar from "./BottomBar";
import "./master.min.css";

const useFolders = (localFolders, localSelectedFolder) => {
  const [folder /*, setFolder*/] = useState(localFolders);
  const [selectedFolder, setSelectedFolder] = useState(localSelectedFolder);

  const selectFolder = (e) => {
    let id = Number(e.target.id);
    let filtered = folder.filter((x) => x.id === id);
    let toObject = filtered[0];
    setSelectedFolder(toObject);
    document.getElementById("FolderList").classList.remove("toggle");
    document.body.classList.remove("overlay");
  };

  return { folder, selectedFolder, selectFolder };
};

const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);
  const [open, setOpen] = useState(0);

  const addTask = (titleInput, folder) => {
    let title = titleInput;
    createTask(title, task, setTask, folder);
    document.body.classList.remove("toggle");
    document.body.classList.remove("overlay");
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
    document.getElementById("Rename-Input").focus();
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

const createTask = (title, task, setTask, folder) => {
  let newTask = {
    id: Date.now(),
    title: title,
    completed: false,
    folder: folder,
  };
  let concat = task.concat(newTask);
  setTask(concat);
};

//

//

function App() {
  const initialState = {
    folder: [],
    tasks: [],
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
    localStorage.setItem("selectedFolder", JSON.stringify(selectedFolder));
  });

  var localTask = JSON.parse(localStorage.getItem("tasks"));
  var localFolder = JSON.parse(localStorage.getItem("folder"));
  var localSelectedFolder = JSON.parse(localStorage.getItem("selectedFolder"));

  if (!localTask) {
    localStorage.setItem("tasks", JSON.stringify(initialState.tasks));
  }
  if (!localFolder) {
    localStorage.setItem("folder", JSON.stringify(initialState.folder));
  }

  const { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle } = useTasks(localTask);
  const { folder, selectedFolder, selectFolder } = useFolders(localFolder, localSelectedFolder);
  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED");
  };

  //

  const filterByFolder = (task) => ({ id }) => {
    let filtered = task.filter((x) => x.folder === id);
    return filtered;
  };
  const folder_task = filterByFolder(task)(selectedFolder);

  var completed_tasks = Object.values(folder_task).filter((x) => x.completed === true);

  //

  const toggle = () => {
    document.getElementById("FolderList").classList.remove("toggle");
    document.getElementById("AddTask").classList.remove("toggle");
    document.body.classList.remove("toggle");
    document.body.classList.remove("overlay");
  };

  return (
    <div className="app">
      <div id="overlay" onClick={() => toggle()}></div>

      <Button action="toggleAdd" image="../add-24px.svg" type="add" />
      <Header folder={selectedFolder} task={task} completed_tasks={completed_tasks} />

      <FolderList folder={folder} selectedFolder={selectedFolder} onSelectFolder={(id) => selectFolder(id)} />

      <FocusTask
        open={open}
        allfolder={folder}
        onBack={() => closeTask()}
        onTitleChange={(value, id) => renameTitle(value, id)}
        onDelete={() => deleteTask("DELETE_TASK")}
      />

      <AddTask onSubmit={(titleInput) => addTask(titleInput, selectedFolder.id)} folder={selectedFolder} />

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
          <p>¿Qué esperas para agregar una? ;D.</p>
          <img src="../assets/img/blank_canvas.svg" alt="No tasks illustration" />
        </div>
      )}

      <BottomBar folder={selectedFolder} />
    </div>
  );
}

export default App;
