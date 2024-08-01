import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, sourceColumnId, onTaskClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  return (
    <Link to={`/task/${task.id}`} className="block">
      <div
        className="bg-white p-2 rounded shadow-md cursor-move border border-gray-300"
        draggable
        onDragStart={handleDragStart}
        // onClick={() => onTaskClick(task)}
      >
        {task.title}
      </div>
    </Link>
  );
};

export default Task;
