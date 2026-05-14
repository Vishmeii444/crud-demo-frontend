"use client";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import * as api from "../services/taskServices";
import { TaskItem } from "../components/TaskItem";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [addStatus, setAddStatus] = useState("Pending");

  const fetchAll = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await api.createTask({ description: input, status: addStatus });

    setInput("");
    setAddStatus("Pending");
    fetchAll();
  };

  const handleUpdate = async (
    id: number,
    newDesc: string,
    newStatus: string,
  ) => {
    try {
      await api.updateTask(id, { description: newDesc, status: newStatus });
      fetchAll();
    } catch (err) {
      console.error("Update failed.", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTask(id);
      fetchAll();
    } catch (err) {
      console.error("Delete failed.", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F4E8] flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-2xl">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-[#BD114A] tracking-tighter italic text-center uppercase">
            Task Tracker
          </h1>
          <div className="h-3 w-full bg-[#FAE251] mt-4 shadow-[5px_5px_0px_#BD114A]"></div>
        </header>

        {/* Input Section */}
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-4 mb-16 bg-white p-6 rounded-xl border-b-8 border-gray-200"
        >
          <div className="flex gap-4">
            <input
              className="flex-1 p-5 rounded-lg border-4 border-gray-300 focus:border-[#FAE251] outline-none text-xl font-bold placeholder:text-gray-300 text-black"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <select
              className="w-48 p-5 border-4 border-gray-300 focus:border-[#FAE251] rounded-lg outline-none font-bold text-black bg-white cursor-pointer"
              value={addStatus}
              onChange={(e) => setAddStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#FAE251] text-[#BD114A] py-4 rounded-lg font-black text-xl shadow-[6px_6px_0px_#BD114A] hover:-translate-y-1 hover:text-[#BD114A] active:translate-y-1 active:shadow-none transition-all uppercase"
          >
            Add Task
          </button>
        </form>

        {/* List Section */}
        <div className="flex flex-col gap-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <div className="text-center py-20 border-4 border-dashed border-gray-300 rounded-xl">
              <p className="font-black uppercase tracking-widest text-black">
                No Active Tasks
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
