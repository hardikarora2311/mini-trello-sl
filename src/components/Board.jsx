import React, { useState, useEffect } from "react";
import Column from "./Column";

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [newStatusTitle, setNewStatusTitle] = useState("");

  useEffect(() => {
    const defaultColumns = [
      {
        id: "design",
        title: "Design",
        tasks: [
          {
            color: "#ecbb09",
            id: 1,
            title:
              "Old fashioned recipe for preventing allergies and chemical sensitivities",
          },
          {
            color: "#ec3609",
            id: 2,
            title: "Home business advertising ideas",
            description:
              "Successful businesses know the importance of building and maintaining good working.",
          },
          {
            color: "#101de0",
            id: 7,
            title: "Cosmetic surgery abroad making the right choice",
          },
        ],
      },
      {
        id: "protip",
        title: "Protip",
        tasks: [
          {
            color: "#0f1780",
            id: 3,
            title:
              "Old fashioned recipe for preventing allergies and chemical sensitivities",
          },
          {
            color: "#1bc55c",
            id: 4,
            title:
              "Unmatched toner cartridge quality 20 less than oem priceUnmatched toner cartridge quality 20 less than oem price",
            description:
              "Why read motivational sayings? For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new.",
          },
        ],
      },
      {
        id: "trello",
        title: "Trello",
        tasks: [
          {
            color: "#1407d5",
            id: 5,
            title: "Types of paper in catalog printing",
            description:
              "Branding is no longer simply about visual appeal (or the cherry in the apple pie example, as given in my earlier article).",
          },
          {
            color: "#fd6944",
            id: 6,
            title: "There is no competition",
            description:
              "This article is floated online with an aim to help you find the best dvd printing solution.",
          },
        ],
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
    <div className="p-16">
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
