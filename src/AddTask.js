import React, { useState } from "react";

const useForm = () => {
  const [titleInput, setTitleInput] = useState("");

  const onChange = (value) => {
    setTitleInput(value);
  };

  return { titleInput, onChange };
};

function AddTask({ onSubmit, folder }) {
  const { titleInput, onChange } = useForm();

  const submit = (e) => {
    onSubmit(titleInput);
    onChange("");
    e.preventDefault();
  };

  return (
    <form id="AddTask" onSubmit={(e) => submit(e)}>
      <h1>Agregar tarea</h1>

      <p>Carpeta: {folder.name}</p>
      <input id="titleInput" value={titleInput} onChange={(e) => onChange(e.target.value)} type="text" placeholder="Título" autoComplete="off"></input>
      <textarea id="form-description" placeholder="Descripción"></textarea>
      <input type="submit" id="cuack" value="Agregar Tarea"></input>
    </form>
  );
}

export default AddTask;
