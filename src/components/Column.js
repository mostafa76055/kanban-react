import React, { useEffect, useState, useRef, useCallback } from "react";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../store/useTaskStore";

function Column({ title, tasks, onEdit = () => {} }) {
  const { moveTask } = useTaskStore();

  // pagination state
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const PAGE_SIZE = 5;

  /** 🧩 تحميل المهام حسب الصفحة */
  const loadMore = useCallback(() => {
    const start = (page - 1) * PAGE_SIZE;
    const newTasks = tasks.slice(start, start + PAGE_SIZE);

    if (newTasks.length === 0) {
      setHasMore(false);
      return;
    }

    // ✅ دمج بدون تكرار
    setVisibleTasks((prev) => [
      ...prev,
      ...newTasks.filter((task) => !prev.some((t) => t.id === task.id)),
    ]);
  }, [page, tasks]);

  /** ♻️ إعادة الضبط عند تغيير المهام */
  useEffect(() => {
    setVisibleTasks([]);
    setPage(1);
    setHasMore(true);
  }, [tasks]);

  /** 📄 تحميل صفحة جديدة */
  useEffect(() => {
    loadMore();
  }, [page, loadMore]);

  /** 🔄 مراقبة التحميل */
  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentLoader);
    return () => observer.disconnect();
  }, [hasMore]);

  /** 🏗️ التعامل مع النقل بين الأعمدة */
  const handleDrop = (e) => {
    e.preventDefault(); // ❗ ضروري
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    moveTask(Number(taskId), title);
  };

  const handleDragOver = (e) => e.preventDefault(); // يسمح بالإفلات

  return (
    <div
      className="column overflow-y-auto max-h-[80vh] p-2"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        background: "#f9fafb",
        borderRadius: "10px",
        minWidth: "300px",
        minHeight: "500px",
      }}
    >
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>

      {visibleTasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}

      {hasMore && (
        <div ref={loaderRef} className="text-center text-gray-500 py-2 text-sm">
          Loading more...
        </div>
      )}
    </div>
  );
}

export default Column;
