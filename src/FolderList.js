import React from "react";

function FolderList({ folder, onSelectFolder }) {
  const { id } = folder;

  var listMap = folder.map(({ id, name }) => (
    <div id={id} key={id} onClick={(e) => onSelectFolder(e)}>
      {name}
    </div>
  ));

  return <div>{listMap}</div>;
}

export default FolderList;
