"use client";
import { useState } from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newDesc: string, newStatus: string) => void;
}

export const TaskItem = ({ task, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate(task.id, editDesc, editStatus);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-lg border-b-4 border-[#BD114A] shadow-sm mb-4">
      <div className="flex-1 mr-4 space-y-2">
        {isEditing ? (
          <>
            <input
              className="w-full p-2 border-2 border-[#FAE251] rounded outline-none font-semibold text-black mb-2"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description"
            />
            <select
              className="w-full p-2 border-2 border-[#FAE251] rounded outline-none font-semibold text-black"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {task.description}
            </h3>
            <span className="text-xs font-black uppercase text-[#D75656] bg-red-50 px-2 py-1 rounded">
              {task.status}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 font-bold hover:scale-105 transition"
          >
            SAVE
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-bold hover:scale-105 transition"
          >
            EDIT
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-[#D75656] text-white px-4 py-2 rounded font-black hover:bg-[#BD114A] transition-colors"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};
