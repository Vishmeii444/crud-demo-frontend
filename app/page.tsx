"use client";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import * as api from "../services/taskServices";
import { TaskItem } from "../components/TaskItem";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const fetchAll = async () => {
    const data = await api.getTasks();
    setTasks(data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await api.createTask({ description: input, status: "Pending" });
    setInput("");
    fetchAll();
  };

  const handleUpdate = async (id: number, newDesc: string) => {
    await api.updateTask(id, { description: newDesc, status: "Updated" });
    fetchAll();
  };

  const handleDelete = async (id: number) => {
    await api.deleteTask(id);
    fetchAll();
  };

  return (
    <main className="min-h-screen bg-[#EEEEEE] flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-2xl">
        <header className="mb-12">
          <h1 className="text-6xl font-black text-[#BD114A] tracking-tighter italic text-center">
            TASK TRACKER
          </h1>
          <div className="h-3 w-full bg-[#FAE251] mt-4 shadow-[5px_5px_0px_#BD114A]"></div>
        </header>

        {/* Input Section */}
        <form onSubmit={handleCreate} className="flex gap-4 mb-16">
          <input
            className="flex-1 p-5 rounded-lg border-4 border-gray-300 focus:border-[#FAE251] outline-none text-xl font-bold placeholder:text-gray-300"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#FAE251] text-[#BD114A] px-10 rounded-lg font-black text-xl shadow-[6px_6px_0px_#BD114A] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
          >
            ADD
          </button>
        </form>

        {/* List Section */}
        <div className="flex flex-col">
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
              <p className="text-gray-400 font-black uppercase tracking-widest">No Active Tasks</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}