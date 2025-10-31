import { create } from "zustand";

export const useTaskStore = create((set, get) => ({
  // ===== State =====
  tasks: [
    {
      id: 1,
      title: "Design login page",
      description: "Create a mockup",
      status: "Backlog",
    },
    {
      id: 2,
      title: "Implement authentication",
      description: "Add OAuth2 support",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Code cleanup",
      description: "Refactor to improve readability",
      status: "Review",
    },
    {
      id: 4,
      title: "Fix login bug",
      description: "Resolve issue with login",
      status: "Done",
    },
  ],

  searchTerm: "",

  // ===== Actions =====

  // Add new task
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Date.now() }],
    })),

  // Update existing task
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updatedTask } : t
      ),
    })),

  // Delete task
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  // Move task between columns (statuses)
  moveTask: (id, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      ),
    })),

  // Set search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Filter tasks by search term
  filteredTasks: () => {
    const { tasks, searchTerm } = get();
    if (!searchTerm.trim()) return tasks;

    const lower = searchTerm.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower)
    );
  },
}));
