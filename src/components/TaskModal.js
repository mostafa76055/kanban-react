import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskStore } from "../store/useTaskStore";

function TaskModal({ isOpen, onClose, editTask }) {
  const { addTask, updateTask } = useTaskStore();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Backlog",
  });

  useEffect(() => {
    if (editTask) setTask(editTask);
    else setTask({ title: "", description: "", status: "Backlog" });
  }, [editTask]);

  const handleSubmit = () => {
    if (!task.title.trim()) return;
    if (editTask) updateTask(editTask.id, task);
    else addTask(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded p-4 shadow-lg"
          style={{ width: "400px", maxWidth: "90%" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h5 className="mb-3 text-center">
            {editTask ? "Edit Task" : "Add New Task"}
          </h5>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <select
            className="form-select mb-3"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option>Backlog</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
          </select>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success w-50 me-2"
              onClick={handleSubmit}
            >
              {editTask ? "Update" : "Add"}
            </button>
            <button className="btn btn-secondary w-50" onClick={onClose}>
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TaskModal;
