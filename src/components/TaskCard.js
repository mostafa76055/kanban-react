import React from "react";
import { useTaskStore } from "../store/useTaskStore";

function TaskCard({ task, onEdit }) {
  const { deleteTask } = useTaskStore();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="card mb-2 shadow-sm p-2"
      draggable
      onDragStart={handleDragStart}
      style={{
        cursor: "grab",
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <div className="card-body p-2">
        <h6 className="fw-bold mb-1">{task.title}</h6>
        <p className="text-muted small mb-2">{task.description}</p>
        <span className="badge bg-secondary mb-2">{task.status}</span>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="border-0 bg-transparent p-0"
            onClick={() => onEdit(task)}
          >
            ✏️
          </button>
          <button
            className="border-0 bg-transparent p-0"
            onClick={() => deleteTask(task.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
