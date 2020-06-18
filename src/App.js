import React, { useState, useEffect } from "react";
import Button from "./Button";
import Header from "./Header";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";
import FocusTask from "./FocusTask";
import FolderList from "./FolderList";
import BottomBar from "./BottomBar";
import "./master.min.css";

//

// Functions
// const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);
const composeById = (...fns) => (x, id) => fns.reduceRight((y, f) => f(y, id), x);
const removeFromArray = (x, id) => Object.values(x).filter((x) => x.id !== id);
const selectHead = (x) => x[0];
const selectFromArray = (x, id) => Object.values(x).filter((x) => x.id === id);
const concat = (x, y) => x.concat(y);
const toString = (x) => JSON.stringify(x);
const toLocal = (name, x) => localStorage.setItem(name, x);

const toggle = (elem) => (action) => {
  elem === "body" ? (elem = document.body.classList) : (elem = document.getElementById(elem).classList);
  elem.contains("toggle") ? elem.remove("toggle") : elem.add("toggle");

  switch (action) {
    case "ADD":
      elem.add("toggle");
      break;
    case "REMOVE":
      elem.remove("toggle");
      break;
    case "TOGGLE":
      elem.contains("toggle") ? elem.remove("toggle") : elem.add("toggle");
      break;
    default:
      console.warn("No se seleccionó case");
  }
};

const newTask = ({ title, folder }) => {
  return { id: Date.now(), title: title, completed: false, folder: folder };
};

//

const useFolders = (localFolders, localSelectedFolder) => {
  const [folder /*, setFolder*/] = useState(localFolders);
  const [selectedFolder, setSelectedFolder] = useState(localSelectedFolder);

  const selectFolder = (id) => {
    id = Number(id);
    composeById(setSelectedFolder, selectHead, selectFromArray)(folder, id);

    toggle("FolderList")("REMOVE");
    toggle("overlay")("REMOVE");
  };

  return { folder, selectedFolder, selectFolder };
};

const useTasks = (tasks) => {
  const [task, setTask] = useState(tasks);
  const [open, setOpen] = useState(0);

  const addTask = (values) => {
    //composeById(setTask, concat, newTask)(task, values);

    setTask(concat(task, newTask(values)));
    toggle("AddTask")("REMOVE");
    toggle("overlay")("REMOVE");
  };

  const completeTask = (id) => {
    id = Number(id);
    const handleComplete = (task, slctId) => {
      if (task.id === slctId) {
        task.completed = !task.completed;
      }

      return task;
    };

    const taskMap = (x, id) => x.map((x) => handleComplete(x, id));

    let completed = taskMap(task, id);

    setTask(completed);
  };

  const deleteTask = (dltCase, selectedFolder) => {
    switch (dltCase) {
      case "DELETE_TASK":
        composeById(setTask, removeFromArray)(task, open.id);
        setOpen(0);
        break;
      case "DELETE_COMPLETED":
        let result = task.filter((x) => x.completed === false && task.folder !== selectedFolder.id);
        setTask(result);
        localStorage.setItem("tasks", toString(result));
        break;
      default:
        console.warn("No se seleccionó case");
    }
  };

  const openTask = (id) => {
    composeById(setOpen, selectHead, selectFromArray)(task, id);
    document.getElementById("Rename-Input").focus();
  };

  const closeTask = () => setOpen(0);

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

//

//

function App() {
  const initialState = {
    folder: [],
    tasks: [],
  };

  useEffect(() => {
    toLocal("tasks", toString(task));
    toLocal("selectedFolder", toString(selectedFolder));
  });

  const parseLocal = (x) => JSON.parse(localStorage.getItem(x));

  var localTask = parseLocal("tasks");
  var localFolder = parseLocal("folder");
  var localSelectedFolder = parseLocal("selectedFolder");

  if (!localTask) {
    toLocal("tasks", toString(initialState.tasks));
  }
  if (!localFolder) {
    toLocal("folder", toString(initialState.folder));
  }

  const { task, open, addTask, deleteTask, completeTask, openTask, closeTask, renameTitle } = useTasks(localTask);
  const { folder, selectedFolder, selectFolder } = useFolders(localFolder, localSelectedFolder);
  const DeleteCompleted = () => {
    deleteTask("DELETE_COMPLETED", selectedFolder);
  };

  //

  const filterByFolder = (task) => ({ id }) => task.filter((x) => x.folder === id);

  const folder_task = filterByFolder(task)(selectedFolder);

  var completed_tasks = Object.values(folder_task).filter((x) => x.completed === true);

  //

  const toggleAll = () => {
    toggle("FolderList")("REMOVE");
    toggle("AddTask")("REMOVE");
    toggle("overlay")("REMOVE");
  };

  return (
    <div className="app">
      <div id="overlay" onClick={() => toggleAll()}></div>

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

      <AddTask onSubmit={(titleInput) => addTask({ title: titleInput, folder: selectedFolder.id })} folder={selectedFolder} />

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
