import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetailsPage = () => {
  const [task, setTask] = useState(null);
  const [columns, setColumns] = useState([]);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedColumns = JSON.parse(localStorage.getItem("columns") || "[]");
    setColumns(storedColumns);
    const foundTask = storedColumns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === parseInt(taskId));
    setTask(foundTask);
  }, [taskId]);

  const handleUpdate = (updatedTask) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.map((t) =>
        t.id === task.id ? { ...t, ...updatedTask } : t
      ),
    }));
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    console.log(updatedColumns);
    navigate("/");
    console.log(updatedColumns);
  };

  const handleDelete = () => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((t) => t.id !== task.id),
    }));
    localStorage.setItem("columns", JSON.stringify(updatedColumns));
    navigate("/");
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 border rounded h-32"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <select
          value={
            columns.find((col) => col.tasks.some((t) => t.id === task.id))?.id
          }
          onChange={(e) => {
            const newColumnId = e.target.value;
            const updatedColumns = columns.map((col) => ({
              ...col,
              tasks:
                col.id === newColumnId
                  ? [...col.tasks, task]
                  : col.tasks.filter((t) => t.id !== task.id),
            }));
            setColumns(updatedColumns);
          }}
          className="w-full p-2 border rounded"
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Color</label>
        <input
          type="color"
          value={task.color}
          onChange={(e) => setTask({ ...task, color: e.target.value })}
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleUpdate(task)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
