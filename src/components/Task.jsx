import { Heart, MessageSquareMore, Paperclip } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, sourceColumnId }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  return (
    <Link to={`/task/${task.id}`} className="block">
      <div
        className=" bg-[#F4F4F4] p-4 rounded-lg shadow-md cursor-move "
        draggable
        onDragStart={handleDragStart}
      >
        <div className="flex flex-col">
          <span
            className="w-16 h-2 rounded-lg mb-4"
            style={{ backgroundColor: task.color }}
          ></span>
          <h3 className="font-normal">{task.title}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>

          <div className="flex justify-end gap-4 mt-6">
            <span className="text-gray-400 text-sm">
              20{" "}
              <MessageSquareMore className="text-gray-400 size-5 inline ml-px" />
            </span>

            <span className="text-gray-400 text-sm">
              20
              <Heart className="text-gray-400 size-5 inline ml-px" />
            </span>
            <span className="text-gray-400 text-sm">
              20
              <Paperclip className="text-gray-400 size-5 inline ml-px" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Task;
