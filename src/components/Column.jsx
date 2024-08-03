import React, { useState } from "react";
import Task from "./Task";
import { Ellipsis } from "lucide-react";

const Column = ({ column, onAddTask, onMoveTask}) => {
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
      className={`flex-shrink-0 w-[362px] rounded-lg ${
        isDraggingOver ? "bg-opacity-70" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className=" bg-[#F4F4F4] p-2 rounded-lg flex justify-between items-center;
"
      >
        <div className="flex gap-3">
          <h2 className={`font-normal px-2`}>{column.title}</h2>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-500 text-xl  hover:text-black">
            <Ellipsis />
          </button>
        </div>
      </div>
      <div className="space-y-6 p-2 mt-2">
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            sourceColumnId={column.id}
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
          className="w-full mt-4 h-[160px] text-center rounded-lg border border-dashed border-gray-400 p-2 font-normal hover:bg-gray-100"
        >
          + Add New Card
        </button>
      )}
    </div>
  );
};

export default Column;
