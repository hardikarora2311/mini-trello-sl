import React, { useState, useEffect } from "react";
import Column from "./Column";

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newStatusTitle, setNewStatusTitle] = useState("");

  useEffect(() => {
    const defaultColumns = [
      {
        id: "notstarted",
        title: "Not started",
        color: "bg-pink-200",
        tasks: [],
      },
      {
        id: "inprogress",
        title: "In progress",
        color: "bg-yellow-200",
        tasks: [],
      },
      {
        id: "completed",
        title: "Completed",
        color: "bg-green-200",
        tasks: [],
      },
    ];
    const loadColumns = () => {
      const storedColumns = localStorage.getItem("columns");
      if (storedColumns) {
        setColumns(JSON.parse(storedColumns));
      } else {
        setColumns(defaultColumns);
        localStorage.setItem("columns", JSON.stringify(defaultColumns));
      }
    };
    loadColumns();
    window.addEventListener("storage", loadColumns);

    return () => {
      window.removeEventListener("storage", loadColumns);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, taskTitle) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              { id: Date.now(), title: taskTitle, description: "" },
            ],
          };
        }
        return column;
      });
      return newColumns;
    });
  };

  const moveTask = (taskId, sourceColumnId, targetColumnId) => {
    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.id === sourceColumnId);
      const targetColumn = prevColumns.find((col) => col.id === targetColumnId);
      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);

      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: sourceColumn.tasks.filter((task) => task.id !== taskId),
      };

      const updatedTargetColumn = {
        ...targetColumn,
        tasks: [...targetColumn.tasks, taskToMove],
      };

      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) return updatedSourceColumn;
        if (column.id === targetColumnId) return updatedTargetColumn;
        return column;
      });
    });
  };

  const addNewStatus = () => {
    if (newStatusTitle.trim()) {
      const newColumn = {
        id: Date.now().toString(),
        title: newStatusTitle.trim(),
        color: `bg-gray-200`,
        tasks: [],
      };
      setColumns((prevColumns) => [...prevColumns, newColumn]);
      setNewStatusTitle("");
      setIsAddingStatus(false);
    }
  };

  return (
    <div className="p-16 h-[90vh]">
      <h1 className="text-4xl font-bold mb-8 text-center">Mini Trello</h1>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={addTask}
            onMoveTask={moveTask}
          />
        ))}
        <div className="flex-shrink-0 w-64">
          {isAddingStatus ? (
            <div className="bg-white p-2 rounded-lg shadow">
              <input
                type="text"
                value={newStatusTitle}
                onChange={(e) => setNewStatusTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                placeholder="Enter status title"
                onKeyDown={(e) => e.key === "Enter" && addNewStatus()}
              />
              <div className="flex justify-between">
                <button
                  onClick={addNewStatus}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddingStatus(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingStatus(true)}
              className="w-full bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200"
            >
              + Add New Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
