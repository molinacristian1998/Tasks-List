import React, { useState } from "react";
import Task from "./Task";

const remainingTasks = (elem) => {
  let tasks = elem;
  let remaining = elem.map((elem) => <Task key={elem.id} id={elem.id} info={elem} />);
  return <div className="TaskContainer">{remaining}</div>;
};

const completedTasks = (elem) => {
  let tasks = elem;
  let completed = elem.map((elem) => <Task key={elem.id} id={elem.id} info={elem} />);
  return <div className="TaskContainer">{completed}</div>;
};

function AllTasks(props) {
  let tasks = props.tasks;
  return (
    <div className="AllTasks">
      <div className="TaskContainer">{remainingTasks(props.remaining)}</div>
      <h1>Completados</h1>
      <div className="TaskContainer">{completedTasks(props.completed)}</div>
    </div>
  );
}

export default AllTasks;
