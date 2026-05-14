"use client";
import { useState } from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newDesc: string) => void;
}

export const TaskItem = ({ task, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.description);

  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-lg border-b-4 border-[#BD114A] shadow-sm mb-4">
      <div className="flex-1">
        {isEditing ? (
          <input
            className="w-full p-2 border-2 border-[#FAE251] rounded outline-none font-semibold"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-800">{task.description}</h3>
            <span className="text-xs font-black uppercase text-[#D75656]">{task.status}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3 ml-4">
        {isEditing ? (
          <button 
            onClick={() => { onUpdate(task.id, editValue); setIsEditing(false); }}
            className="text-green-600 font-bold hover:scale-110 transition-transform"
          >
            SAVE
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-bold hover:scale-110 transition-transform"
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