import React from "react";
import Task from "./Task";

function AllTasks({ remaining, completed, onRemoveTask, onCompleteTask }) {
  var newId = 0;

  //

  const mapTask = (elem) => <Task key={elem.id} id={elem.id} info={elem} onComplete={(e) => thisAsk(e)} />;

  const completedTasks = (elem) => {
    let completed = elem.map((elem) => mapTask(elem));
    return <div className="TaskContainer">{completed}</div>;
  };

  const remainingTasks = (elem) => {
    let remaining = elem.map((elem) => mapTask(elem));
    return (
      <div className="TaskContainer" onClick={(e) => onClick(e)}>
        {remaining}
      </div>
    );
  };

  const thisAsk = (event) => {
    onCompleteTask(event.target.parentElement.id);
  };

  //

  const onClick = (e) => {
    newId = e.target.parentElement.parentElement.id;
    document.querySelectorAll(".AllTasks")[0].id = newId;
  };

  return (
    <div
      className="AllTasks"
      onClick={(e) => {
        onRemoveTask(e);
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
