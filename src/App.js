import React, { useState } from "react";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import { useTaskStore } from "./store/useTaskStore";
import "bootstrap/dist/css/bootstrap.min.css";
import DynamicList from "./components/DynamicList";

function App() {
  const { filteredTasks, setSearchTerm } = useTaskStore();
  const tasks = filteredTasks();
  const statuses = ["Backlog", "In Progress", "Review", "Done"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleOpenModal = (task = null) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="App container py-4">
      <div className="header d-flex align-items-center justify-content-between w-100 border-bottom pb-3 mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by task title or description"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Task
        </button>
      </div>

      <div className="row">
        {statuses.map((status) => (
          <div className="col-md-3">
            <Column
              key={status}
              title={status}
              tasks={tasks.filter((t) => t.status === status)}
              onEdit={handleOpenModal}
            />
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editTask={editTask}
      />
      <hr />
      <DynamicList />
    </div>
  );
}

export default App;
