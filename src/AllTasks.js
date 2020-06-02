import React from "react";
import Task from "./Task";

const completedTasks = (elem) => {
  let completed = elem.map((elem) => <Task key={elem.id} id={elem.id} info={elem} />);
  return <div className="TaskContainer">{completed}</div>;
};

function AllTasks({ remaining, completed, onRemoveTask, onCompleteTask }) {
  var newId = 0;

  //

  //

  const onClick = (e) => {
    newId = e.target.parentElement.parentElement.id;
    document.querySelectorAll(".AllTasks")[0].id = newId;
  };

  const onComplete = (e) => {
    newId = e.target.parentElement.parentElement.id;
    document.querySelectorAll(".AllTasks")[0].id = newId;
  };

  const remainingTasks = (elem) => {
    let remaining = elem.map((elem) => <Task key={elem.id} id={elem.id} info={elem} />);
    return (
      <div className="TaskContainer" onComplete={(e) => onComplete(e)} onClick={(e) => onClick(e)}>
        {remaining}
      </div>
    );
  };

  return (
    <div
      className="AllTasks"
      onClick={(e) => {
        onRemoveTask(e);
        onCompleteTask(e);
      }}
      id={newId}
    >
      <div className="TaskContainer">{remainingTasks(remaining)}</div>
      <div className="CompletedHeader">
        <h1>Completados ({completed.length})</h1>
        <p>Borrar Completados</p>
      </div>
      <div className="TaskContainer">{completedTasks(completed)}</div>
    </div>
  );
}

export default AllTasks;
