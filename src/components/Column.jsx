import React, { useState } from "react";
import Task from "./Task";

const Column = ({ column, onAddTask, onMoveTask, onTaskClick }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    onMoveTask(parseInt(taskId), sourceColumnId, column.id);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle.trim());
      setNewTaskTitle("");
      setIsAddingTask(false);
    }
  };

  return (
    <div
      className={`flex-shrink-0 w-72 rounded-lg ${
        isDraggingOver ? "bg-opacity-70" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-3">
          <h2 className={`font-medium px-2 ${column.color}`}>{column.title}</h2>
          <span className="text-gray-500">{column.tasks.length}</span>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-500 text-xl  hover:text-black">
            ...
          </button>
          <button
            onClick={() => setIsAddingTask(true)}
            className="text-gray-500 text-xl hover:text-black"
          >
            +
          </button>
        </div>
      </div>
      <div className="space-y-2 p-2">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            sourceColumnId={column.id}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      {isAddingTask ? (
        <div className="p-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter task title"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full text-left rounded p-2 text-gray-500 hover:bg-gray-100"
        >
          + New
        </button>
      )}
    </div>
  );
};

export default Column;
