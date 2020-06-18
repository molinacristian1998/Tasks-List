import React from "react";
import Task from "./Task";

function AllTasks({ task, selectedFolder, onRemoveTask, onOpenTask, onCompleteTask, onDeleteCompleted }) {
  task = task.filter((x) => x.folder === selectedFolder.id);

  const countRemaining = (task) => {
    let completed = task.filter((x) => x.completed === true);
    let count = completed.length;
    return count;
  };

  const mapTask = (elem) => <Task key={elem.id} id={elem.id} info={elem} onComplete={(e) => thisAsk(e)} onOpen={(e) => openTask(e)} />;

  const completedTasks = (elem) => {
    let result = elem.filter((x) => x.completed === true);
    let completed = result.map((elem) => mapTask(elem));
    return <div className="TaskContainer Completed">{completed}</div>;
  };

  const remainingTasks = (elem) => {
    let result = elem.filter((x) => x.completed === false);
    let remaining = result.map((elem) => mapTask(elem));
    return <div className="TaskContainer">{remaining}</div>;
  };

  const thisAsk = (event) => {
    onCompleteTask(event.target.parentElement.id);
  };

  //

  const openTask = (id) => {
    onOpenTask(id);
  };

  return (
    <div
      className="AllTasks"
      onClick={(e) => {
        onRemoveTask(e);
      }}
    >
      <div className="TaskContainer">{remainingTasks(task)}</div>
      <div className="CompletedHeader">
        <h1>Completados ({countRemaining(task)})</h1>
        <p onClick={() => onDeleteCompleted()}>Borrar Completados</p>
      </div>
      <div className="TaskContainer">{completedTasks(task)}</div>
    </div>
  );
}

export default AllTasks;
